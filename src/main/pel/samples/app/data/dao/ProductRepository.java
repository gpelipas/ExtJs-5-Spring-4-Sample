package pel.samples.app.data.dao;

import java.util.Map;
import java.util.List;

public interface ProductRepository extends AbstractRepository<Product> {
	
   List<Product> getProductsByCriteria(Map<String> criteria);

}
