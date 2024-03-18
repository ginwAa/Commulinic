package com.commulinic.controller;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import com.commulinic.entity.dto.ChatReadDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.service.ChatMessageService;
import com.commulinic.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Resource
    private ChatMessageService chatMessageService;

    @PostMapping("/send")
    public Result<Long> add(@RequestBody ChatMessage chatMessage) {
        Long added = chatMessageService.add(chatMessage);
        return Result.success(added);
    }

    @PostMapping("/read")
    public Result<Long> read(@RequestBody ChatReadDTO dto) {
        Long updated = chatMessageService.read(dto, SecurityUtil.getUserId());
        Assert.isTrue(updated != null && updated > 0, "读取失败");
        return Result.success(updated);
    }

    @PostMapping("/update")
    public Result<Long> update(@RequestBody ChatMessage chatMessage) {
        Long updated = chatMessageService.update(chatMessage);
        Assert.isTrue(updated != null && updated > 0, "更新失败");
        return Result.success(updated);
    }

    @PostMapping("/count")
    public Result<Long> count(@RequestBody ChatMessage chatMessage) {
        Long count = chatMessageService.count(chatMessage);
        return Result.success(count);
    }

    @GetMapping("/list")
    public Result<List<Chat>> getChatListByUserId() {
        List<Chat> chatList = chatMessageService.getChatListByUserId(SecurityUtil.getUserId());
        return Result.success(chatList);
    }

    @GetMapping("/all/{id}")
    public Result<List<ChatMessage>> selectAllByUserId(@PathVariable Long id) {
        List<ChatMessage> chatMessages = chatMessageService.selectAllByUserId(SecurityUtil.getUserId(), id);
        return Result.success(chatMessages);
    }
}
