package com.commulinic.service.impl;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.AnnouncementMapper;
import com.commulinic.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {
    @Autowired
    private AnnouncementMapper announcementMapper;

    @Override
    public Long count(Announcement announcement) {
        return announcementMapper.count(announcement);
    }

    @Override
    public PageVO<Announcement> page(PageQueryDTO<Announcement> dto) {
        PageVO<Announcement> vo = new PageVO<>();
        vo.setRecords(announcementMapper.page(dto));
        if (dto.getCount()) {
            vo.setTotal(announcementMapper.count(dto.getData()));
        }
        return vo;
    }

    @Override
    public Long update(Announcement announcement) {
        announcement.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        return announcementMapper.update(announcement);
    }

    @Override
    public Long add(Announcement announcement) {
        announcement.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        return announcementMapper.add(announcement);
    }
}
