package com.commulinic.controller;

import com.commulinic.entity.Department;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.service.DepartmentService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    @Resource
    private DepartmentService departmentService;

    @GetMapping("/tree/{type}")
    public Result<DepartmentVO> tree(@PathVariable Integer type) {
        DepartmentVO tree = departmentService.tree(type);
        return Result.success(tree);
    }

    @GetMapping("/tree/register")
    public Result<DepartmentVO> treeRegister() {
        DepartmentVO tree = departmentService.tree(2);
        return Result.success(tree);
    }

    @PostMapping("/add")
    public Result<Long> add(@RequestBody Department department) {
        Long added = departmentService.add(department);
        return Result.success(added);
    }

    @PostMapping("/update")
    public Result<Long> update(@RequestBody Department department) {
        Long updated = departmentService.update(department);
        return Result.success(updated);
    }

    @PostMapping("/delete/{id}")
    public Result<Long> delete(@PathVariable Long id) {
        Long deleted = departmentService.delete(id);
        return Result.success(deleted);
    }

    @GetMapping("/getById/{id}")
    public Result<Department> getById(@PathVariable Long id) {
        Department res = departmentService.getById(id);
        return Result.success(res);
    }

}
