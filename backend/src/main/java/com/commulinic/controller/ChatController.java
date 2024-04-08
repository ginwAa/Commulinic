package com.commulinic.controller;

import cn.hutool.core.lang.Assert;
import com.commulinic.entity.Chat;
import com.commulinic.entity.ChatMessage;
import com.commulinic.entity.dto.ChatReadDTO;
import com.commulinic.entity.result.Result;
import com.commulinic.service.ChatMessageService;
import com.commulinic.util.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Resource
    private ChatMessageService chatMessageService;

    @PostMapping("/send")
    @PreAuthorize("hasAuthority('normal:create')")
    public Result<Long> add(@RequestBody ChatMessage chatMessage) {
        Long added = chatMessageService.add(chatMessage);
        return Result.success(added);
    }

    @PostMapping("/add/chat")
    @PreAuthorize("hasAuthority('normal:create')")
    public Result<Long> addChat(@RequestBody Chat chat) {
        Long added = chatMessageService.addChat(chat);
        return Result.success(added);
    }

    @PostMapping("/update/chat")
    @PreAuthorize("hasAuthority('normal:update')")
    public Result<Long> updateChat(@RequestBody Chat chat) {
        Long updated = chatMessageService.updateChat(chat);
        return Result.success(updated);
    }

    @PostMapping("/read")
    @PreAuthorize("hasAuthority('normal:update')")
    public Result<Long> read(@RequestBody ChatReadDTO dto) {
        Long updated = chatMessageService.read(dto.getChatId(), LocalDateTime.now());
        Assert.isTrue(updated != null && updated > 0, "读取失败");
        return Result.success(updated);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('normal:update')")
    public Result<Long> update(@RequestBody ChatMessage chatMessage) {
        Long updated = chatMessageService.update(chatMessage);
        Assert.isTrue(updated != null && updated > 0, "更新失败");
        return Result.success(updated);
    }

//    @PostMapping("/count")
//    public Result<Long> count(@RequestBody ChatMessage chatMessage) {
//        Long count = chatMessageService.count(chatMessage);
//        return Result.success(count);
//    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('normal:read')")
    public Result<List<Chat>> getChatListByUserId() {
        List<Chat> chatList = chatMessageService.getChatListByUserId(SecurityUtil.getUserId());
        return Result.success(chatList);
    }

    @PostMapping("/all")
    @PreAuthorize("hasAuthority('normal:read')")
    public Result<List<ChatMessage>> selectByChat(@RequestBody Chat chat) {
        List<ChatMessage> chatMessages = chatMessageService.selectByChat(chat);
        return Result.success(chatMessages);
    }
}
