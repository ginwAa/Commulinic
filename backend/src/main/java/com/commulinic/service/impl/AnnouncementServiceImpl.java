package com.commulinic.service.impl;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;
import com.commulinic.mapper.AnnouncementMapper;
import com.commulinic.service.AnnouncementService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {
    @Resource
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
        Long updated = announcementMapper.update(announcement);
        Assert.isTrue(updated != null && updated > 0, "操作失败");
        return updated;
    }

    @Override
    public Long delete(Announcement announcement) {
        Long deleted = announcementMapper.delete(announcement);
        Assert.isTrue(deleted > 0, "操作失败");
        return deleted;
    }

    @Override
    public Long add(Announcement announcement) {
        announcement.setUpdatedAt((int) (System.currentTimeMillis() / 1000));
        Long added = announcementMapper.add(announcement);
        Assert.isTrue(added != null && added > 0, "操作失败");
        return added;
    }
}
