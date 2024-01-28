package com.commulinic.service.impl;

import com.commulinic.entity.Department;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.mapper.ApplicationMapper;
import com.commulinic.mapper.DepartmentMapper;
import com.commulinic.mapper.DoctorMapper;
import com.commulinic.service.DepartmentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;
    @Autowired
    private DoctorMapper doctorMapper;
    @Autowired
    private ApplicationMapper applicationMapper;
    private final static String REDIS_DEPARTMENT_TREE_KEY = "departmentTree";
    @Autowired
    private RedisTemplate redisTemplate;

    public DepartmentVO tree() {
        DepartmentVO res = (DepartmentVO) redisTemplate.opsForValue().get(REDIS_DEPARTMENT_TREE_KEY);
        if (res != null) {
            return res;
        }
        List<Department> data = departmentMapper.all();
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
        redisTemplate.opsForValue().set(REDIS_DEPARTMENT_TREE_KEY, root);
        return root;
    }

    public Long add(Department department) {
        Long added = departmentMapper.add(department);
        if (added != null) {
            redisTemplate.delete(REDIS_DEPARTMENT_TREE_KEY);
        }
        return added;
    }

    @Transactional
    public Long update(Department department) {
        if (department.getName() != null) {
            doctorMapper.updateDepartment(department);
            applicationMapper.updateDepartment(department);
        }
        Long updated = departmentMapper.update(department);
        if (updated != null) {
            redisTemplate.delete(REDIS_DEPARTMENT_TREE_KEY);
        }
        return updated;
    }

    @Transactional
    public Long delete(Long id) {
        Long deleted = departmentMapper.delete(id);
        if (deleted != null) {
            redisTemplate.delete(REDIS_DEPARTMENT_TREE_KEY);
        }
        return deleted;
    }

    public Department getById(Long id) {
        return departmentMapper.getById(id);
    }
}
