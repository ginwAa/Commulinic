package com.commulinic;

import lombok.SneakyThrows;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Objects;

@SpringBootTest
public class myTest {

    @Test
    @SneakyThrows
    void test() {
        // 获取模版文档流 -> 请假报告表
        InputStream inputStreamB = getClass().getClassLoader().getResourceAsStream("word/西城消防救援支队干部因私离京报告表.docx");
        //创建easypoi 文档对象
        XWPFDocument word = new XWPFDocument(Objects.requireNonNull(inputStreamB));
        XWPFTable table = word.getTables().get(0);
        table.getRows();
        XWPFTableRow newRow = table.createRow();
        newRow.getCell(0).setText("张三");
        newRow.createCell().setText("李四");
        FileOutputStream out = new FileOutputStream("example.docx");
        word.write(out);
        out.close();
        word.close();
        inputStreamB.close();
    }
}
