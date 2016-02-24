package pel.samples.app.service;

import java.util.List;

import pel.samples.app.data.model.Product;

public interface ProductService {
	
	Product saveProduct(Product p);
	
	Product getProductById(String id);
	
	List<Product> getAllProducts();
	
}
