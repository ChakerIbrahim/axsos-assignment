package com.chaker.authentication.services;

import com.chaker.authentication.models.Category;
import com.chaker.authentication.models.Product;
import org.springframework.stereotype.Service;


@Service
public class CategoryService {
    Category thisCategory = findCategoryById(categoryId);

    Product thisProduct = finProductByID(productId);

    thisCategory.getProducts().add(thisProduct);

    categoryRepository.save(thisCategory);


    thisProduct.getCategories().add(thisCategory);

    productRepository.save(thisProduct);
}