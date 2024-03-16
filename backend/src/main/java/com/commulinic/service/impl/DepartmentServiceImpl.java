package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.constant.RedisConstant;
import com.commulinic.entity.Department;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.mapper.DepartmentMapper;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentMapper departmentMapper;
    private final DoctorMapper doctorMapper;
    private final ApplicationMapper applicationMapper;
    private final RedisTemplate<String, Object> redisTemplate;

    public DepartmentVO tree(Integer type) {
        DepartmentVO res = (DepartmentVO) redisTemplate.opsForValue().get(RedisConstant.REDIS_DEPARTMENT_TREE_KEY + type);
        if (res != null) {
            return res;
        }
        List<Department> data = type == 2 ? departmentMapper.allReg() : departmentMapper.all();
        DepartmentVO root = new DepartmentVO();
        Long rootId = null;
        Map<Long, DepartmentVO> map = new HashMap<>();
        int i = 0;
        for (; i < data.size(); ++i) {
            if (data.get(i).getParentId() == null) {
                BeanUtils.copyProperties(data.get(i), root);
                root.setChildren(new ArrayList<>());
                rootId = root.getId();
                map.put(rootId, root);
                break;
            }
        }
        if (rootId == null) {
            return null;
        }
        for (; i < data.size(); ++i) {
            DepartmentVO parent = map.get(data.get(i).getParentId());
            if (parent != null) {
                DepartmentVO child = new DepartmentVO();
                BeanUtils.copyProperties(data.get(i), child);
                child.setChildren(new ArrayList<>());
                parent.getChildren().add(child);
                map.put(data.get(i).getId(), child);
            }
        }
        redisTemplate.opsForValue().set(RedisConstant.REDIS_DEPARTMENT_TREE_KEY + type, root, Duration.ofMinutes(1L));
        return root;
    }

    public Long add(Department department) {
        Long added = departmentMapper.add(department);
        if (added != null) {
            redisTemplate.delete(RedisConstant.REDIS_DEPARTMENT_TREE_KEY);
        }
        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }

    @Transactional
    public Long update(Department department) {
        if (department.getName() != null) {
            doctorMapper.updateDepartment(department);
            applicationMapper.updateDepartment(department);
        }
        Long updated = departmentMapper.update(department);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        if (updated != null) {
            redisTemplate.delete(RedisConstant.REDIS_DEPARTMENT_TREE_KEY);
        }
        return updated;
    }

    @Transactional
    public Long delete(Long id) {
        Long deleted = departmentMapper.delete(id);
        Assert.isTrue(deleted != null && deleted > 0, "操作失败");
        if (deleted != null) {
            redisTemplate.delete(RedisConstant.REDIS_DEPARTMENT_TREE_KEY);
        }
        return deleted;
    }

    public Department getById(Long id) {
        return departmentMapper.getById(id);
    }
}
