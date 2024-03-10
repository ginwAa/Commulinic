package com.commulinic.entity.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

public class DepartmentVO implements Serializable {
    @JsonProperty("value")
    public Long id;
    @JsonProperty("title")
    public String name;
    @Getter
    @Setter
    private String description;
    @Getter
    @Setter
    private Long parentId;
    @Getter
    @Setter
    private List<DepartmentVO> children;
    @Getter
    @Setter
    private Integer type;

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

}
