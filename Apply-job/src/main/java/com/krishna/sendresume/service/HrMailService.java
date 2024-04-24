package com.krishna.sendresume.service;

import com.krishna.sendresume.model.HrMail;
import com.krishna.sendresume.repository.HrMailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.util.List;

@Service
public class HrMailService {

    @Autowired
    private HrMailRepository hrMailRepository;

    public List<HrMail> getAllMails()
    {
        return hrMailRepository.findAll();
    }

    public List<HrMail> addMail(MultipartFile csvFile)
    {
       List<HrMail> hrMails = hrMailRepository.findAll();

       if(hrMails.isEmpty()){
           try(BufferedReader reader = new BufferedReader(new InputStreamReader(csvFile.getInputStream()))) {
               String line;
               while ((line = reader.readLine()) != null) {
                   hrMails = hrMailRepository.findAll();
                   String[] data = line.split(","); // Assuming CSV fields are comma-separated
                   String csvMail = data[0].replace("\"","").trim();
                   HrMail hrMail = new HrMail();
                   if(hrMails.isEmpty()) {
                       hrMail.setHrMail(csvMail);
                       hrMailRepository.save(hrMail);
                   }else {
                       if(!checkAlredyAddEMail(csvMail,hrMails)){
                           hrMail.setHrMail(csvMail);
                           hrMailRepository.save(hrMail);
                       }
                   }
               }
               System.out.println("Data imported successfully ................");
               return hrMailRepository.findAll();
           } catch (IOException e) {
               e.printStackTrace();
           }
           return hrMailRepository.findAll();
       }else {
           try(BufferedReader reader = new BufferedReader(new InputStreamReader(csvFile.getInputStream()))) {
               String line;
               while ((line = reader.readLine()) != null) {
                   String[] data = line.split(",");
                   HrMail hrMail = new HrMail();

                   String csvMail = data[0].replace("\"","").trim();
                   if(!checkAlredyAddEMail(csvMail,hrMails)){
                       hrMail.setHrMail(csvMail);
                       hrMailRepository.save(hrMail);
                   }
               }
               System.out.println("Data imported successfully ................");
               return hrMailRepository.findAll();
           } catch (IOException e) {
               e.printStackTrace();
           }
           return null;
       }
    }

    private boolean checkAlredyAddEMail(String mail,List<HrMail> hrMails){

        for(HrMail hrMail : hrMails) {
            if (hrMail.getHrMail().equals(mail)) {
                return true;
            }
        }
        return false;
    }

    public HrMail addHrMail(HrMail mail)
    {
        List<HrMail> hrMails = hrMailRepository.findAll();

        if(hrMails.isEmpty()){
            if(mail.getHrMail().isEmpty()) {
                return null;
            }
            mail.setDateOfSend(null);
            return hrMailRepository.save(mail);
        }else {
            if(mail.getHrMail().isEmpty()) {
                return null;
            }else{
                if(checkAlredyAddEMail(mail.getHrMail(),hrMails)){
                    return null;
                }
                return hrMailRepository.save(mail);
            }
        }
    }

    public boolean deleteAllHrMails(){
        List<HrMail> hrMails = hrMailRepository.findAll();
        if(!hrMails.isEmpty()){
            hrMailRepository.deleteAll(hrMails);
            return true;
        }
        return false;
    }
}
