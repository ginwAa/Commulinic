package com.commulinic.service.impl;

import com.commulinic.mapper.AnnouncementMapper;
import com.commulinic.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {
    @Autowired
    private AnnouncementMapper announcementMapper;
}
