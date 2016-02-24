package pel.samples.app.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pel.samples.app.data.model.Product;
import pel.samples.app.data.model.ProductHistory.ProductAndLatestChange;
import pel.samples.app.service.ProductService;

@RestController
public class ProductServiceController {

	@Autowired
	private ProductService productService;

	@RequestMapping(value = "/product/", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> listAllProducts() {
		List<Product> products = productService.getAllProducts();
		if (products.isEmpty()) {
			return new ResponseEntity<List<Product>>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> getProduct(@PathVariable("id") String id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }
 
    @RequestMapping(value = "/product/", method = RequestMethod.POST)
    public ResponseEntity<ProductAndLatestChange> addProduct(@RequestBody Product product) {
    	Product p = productService.saveProduct(product);
    	return new ResponseEntity<ProductAndLatestChange>((ProductAndLatestChange) p, HttpStatus.OK);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.POST)
    public ResponseEntity<ProductAndLatestChange> updateProduct(@PathVariable("id") String id, @RequestBody Product product) {
    	Product p = productService.saveProduct(product);
    	return new ResponseEntity<ProductAndLatestChange>((ProductAndLatestChange) p, HttpStatus.OK);
    }
    
}
