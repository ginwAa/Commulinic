package com.commulinic.service.impl;

import com.commulinic.entity.Department;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.mapper.DepartmentMapper;
import com.commulinic.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;

    public DepartmentVO tree() {
        List<Department> data = departmentMapper.all();

        DepartmentVO root = new DepartmentVO();
        Long rootId = null;
//        log.info("data {}", data);
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
        return root;
    }

    public Long add(Department department) {
        return departmentMapper.add(department);
    }

    public Long update(Department department) {
        return departmentMapper.update(department);
    }

    public Long delete(Long id) {
        return departmentMapper.delete(id);
    }

    public Department getById(Long id) {
        return departmentMapper.getById(id);
    }
}
