package com.commulinic.service;

import com.commulinic.entity.Announcement;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;

public interface AnnouncementService {
    Long count(Announcement announcement);

    PageVO<Announcement> page(PageQueryDTO<Announcement> dto);

    Long update(Announcement announcement);

    Long add(Announcement announcement);

    Long delete(Announcement announcement);
}
