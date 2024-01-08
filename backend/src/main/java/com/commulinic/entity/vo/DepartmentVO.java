package com.commulinic.entity.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class DepartmentVO implements Serializable {
    @JsonProperty("value")
    public Long id;
    @JsonProperty("title")
    public String name;
    private String description;
    private Long parentId;
    private List<DepartmentVO> children;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<DepartmentVO> getChildren() {
        return children;
    }

    public void setChildren(List<DepartmentVO> children) {
        this.children = children;
    }

}
