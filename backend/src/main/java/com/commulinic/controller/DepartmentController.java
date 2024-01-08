package com.commulinic.controller;

import com.commulinic.entity.Department;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/tree")
    public DepartmentVO tree() {
        return departmentService.tree();
    }

    @PostMapping("/add")
    public Long add(@RequestBody Department department) {
        return departmentService.add(department);
    }

    @PostMapping("/update")
    public Long update(@RequestBody Department department) {
        return departmentService.update(department);
    }

    @PostMapping("/delete/{id}")
    public Long delete(@PathVariable Long id) {
        return departmentService.delete(id);
    }

    @GetMapping("/getById/{id}")
    public Department getById(@PathVariable Long id) {
        return departmentService.getById(id);
    }

}
