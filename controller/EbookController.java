package com.example.SpringBootPaymentGatewayRazorPay.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/ebooks")
@CrossOrigin("*")
public class EbookController {

    // ✅ Serve a Specific eBook (PDF/ePub)
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getEbook(@PathVariable String fileName) {
        try {
            // Load file from src/main/resources/ebooks/
            ClassPathResource resource = new ClassPathResource("ebooks/" + fileName);

            if (!resource.exists()) {
                System.out.println("File not found: " + fileName);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok()
                    .contentType(getMediaType(fileName))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // ✅ List All eBooks in the "ebooks" Directory
    @GetMapping("/list")
    public ResponseEntity<List<String>> listAllEbooks() {
        try {
            List<String> ebookFiles = new ArrayList<>();

            // Use ClassPathResource to get directory path
            ClassPathResource resource = new ClassPathResource("ebooks/");
            Path ebooksDirPath = Paths.get(resource.getURI());

            Files.list(ebooksDirPath).forEach(file -> ebookFiles.add(file.getFileName().toString()));

            return ResponseEntity.ok(ebookFiles);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // ✅ Determine Content Type (PDF / ePub)
    private MediaType getMediaType(String fileName) {
        if (fileName.endsWith(".pdf")) {
            return MediaType.APPLICATION_PDF;
        } else if (fileName.endsWith(".epub")) {
            return MediaType.parseMediaType("application/epub+zip");
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
