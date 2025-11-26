package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import java.math.BigDecimal; // Importante
import java.util.List;

public interface CarrinhoService {
    BigDecimal validarCarrinho(List<CarrinhoItemDTO> itens);
}