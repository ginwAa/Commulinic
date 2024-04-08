package com.commulinic.controller;

import com.commulinic.entity.Department;
import com.commulinic.entity.result.Result;
import com.commulinic.entity.vo.DepartmentVO;
import com.commulinic.service.DepartmentService;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/department")
public class DepartmentController {
    @Resource
    private DepartmentService departmentService;

    @GetMapping("/tree/{type}")
    @PreAuthorize("hasAuthority('normal:read')")
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
    @PreAuthorize("hasAuthority('admin:create')")
    public Result<Long> add(@RequestBody Department department) {
        Long added = departmentService.add(department);
        return Result.success(added);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('admin:update')")
    public Result<Long> update(@RequestBody Department department) {
        Long updated = departmentService.update(department);
        return Result.success(updated);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('admin:delete')")
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
