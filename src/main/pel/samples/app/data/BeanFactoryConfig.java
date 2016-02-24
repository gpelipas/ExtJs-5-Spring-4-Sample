package pel.samples.app.data;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import pel.samples.app.data.model.Product;
import pel.samples.app.data.model.ProductHistory;
import pel.samples.app.data.util.FileStoreProvider;
import pel.samples.app.data.util.JsonStoreProvider;

import com.fasterxml.jackson.core.type.TypeReference;

@Configuration
public class BeanFactoryConfig  {
	
    @Bean(name = "productStore")
    public FileStoreProvider getProductJsonStore() {
    	return new JsonStoreProvider("/Temp/products.json", new TypeReference<List<Product>>(){});
    }
    
    @Bean(name = "productHistoryStore")
    public FileStoreProvider getProductHistJsonStore() {
    	return new JsonStoreProvider("/Temp/products_history.json", new TypeReference<List<ProductHistory>>(){});
    }
    
}
