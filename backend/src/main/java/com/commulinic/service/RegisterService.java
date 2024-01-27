package com.commulinic.service;

import com.commulinic.entity.Register;
import com.commulinic.entity.dto.PageQueryDTO;
import com.commulinic.entity.vo.PageVO;

public interface RegisterService {

    PageVO<Register> page(PageQueryDTO<Register> dto);

    Long add(Register register);

    Long update(Register register);

    Long count(Register register);

    Long updateUserName(Long userId, String userName);

    Long updateDoctorName(Long doctorId, String doctorName);
}
