package com.commulinic.controller;

import com.commulinic.entity.PageResult;
import com.commulinic.entity.dto.MedicalTipPageQueryDTO;
import com.commulinic.service.MedicalTipService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meditip")
@Slf4j
public class MedicalTipController {
    @Autowired
    private MedicalTipService medicalTipService;

    @GetMapping("/page")
    private PageResult page(MedicalTipPageQueryDTO dto) {
    }
}
