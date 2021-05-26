package com.finacial.service;

import com.finacial.dto.AccountDTO;
import com.finacial.dto.ConversationDTO;
import com.finacial.model.Account;
import com.finacial.model.Status;
import com.finacial.model.VerificationToken;
import com.finacial.repository.AccountRepository;
import com.finacial.repository.VerificationTokenRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class IAccountServiceImpl implements IAccountService {
    @Autowired
    private ModelMapper modelMapper;
    @Value("${passwordSalt.length}")
    int length;
    @Value("${passwordSalt.hasLetter}")
    boolean hasLetter;
    @Value("${passwordSalt.hasNumber}")
    boolean hasNumber;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private Status statusAccActived;

    @Autowired
    private AccountRepository repository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Override
    public String generatePassWordSalt() {
        String generatedString = RandomStringUtils.random(length, hasLetter, hasNumber);
        return generatedString;
    }

    @Override
    @Transactional
    public String getPasswordsaltByUsername(String username) {
        try {
            Query query = entityManager.createNamedQuery("Account.getPasswordSaltByUsername");
            query.setParameter("username", username);
            String passwordSalt = (String) query.getResultList().get(0);
            return null != passwordSalt ? passwordSalt : "";
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @Override
    public AccountDTO toDto(Account account) {
        return modelMapper.map(account, AccountDTO.class);
    }

    @Override
    public void updateStatus(Long accId, Status status) {
        try {
            transactionTemplate.execute(transactionStatus -> {
                entityManager.createNamedQuery("Account.updateStatus")
                        .setParameter("statusId", status.getStatusId())
                        .setParameter("accountId", accId)
                        .executeUpdate();
                transactionStatus.flush();
                return null;
            });
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void activeAccount(Long accId) {
        try {
            updateStatus(accId, statusAccActived);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public List<AccountDTO> getAll() {
        List<Account> list = repository.findAll();
        return convertBoToDto(list);
    }

    @Override
    public List<AccountDTO> findAllByUsernameContaining(String username, Pageable pageable) {
        List<Account> list = repository.findAllByUsernameContaining(username.trim(), pageable);
        List<AccountDTO> result = new ArrayList<>();
        if (null != list && !list.isEmpty()) {
            AccountDTO dto = new AccountDTO();
            for (Account bo : list) {
                dto.setId(bo.getId());
                dto.setUsername(bo.getUsername());
                dto.setAvatar(bo.getAvatar());
                result.add(dto);
                dto = new AccountDTO();
            }
        }
        return result;
    }

    @Override
    public List<AccountDTO> findAll(Pageable pageable) {
        List<Account> list = repository.findAllByUsernameContaining("", pageable);
        return convertBoToDto(list);
    }

    private List<AccountDTO> convertBoToDto(List<Account> bos) {
        List<AccountDTO> result = new ArrayList<>();
        if (null != bos && !bos.isEmpty()) {
            result = Arrays.asList(modelMapper.map(bos, AccountDTO[].class));

        }
        return result;
    }

}
