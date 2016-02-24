package pel.samples.app.data;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pel.samples.app.data.dao.ProductHistoryRepository;
import pel.samples.app.data.dao.ProductRepository;
import pel.samples.app.data.model.Product;
import pel.samples.app.data.model.ProductHistory;
import pel.samples.app.data.model.Product.CodeValue;
import pel.samples.app.data.model.ProductHistory.ChangeType;
import pel.samples.app.data.model.ProductHistory.ProductAndLatestChange;

@Component
@Aspect
public class ProductChangesTrackingAspect {

	private final Logger log = Logger.getLogger(getClass());	
	
	@Autowired
	private ProductRepository productRepository;
	
	
	@Autowired
	private ProductHistoryRepository productHistoryRepository;
	
	
	@Around("execution(* pel.samples.app.service.ProductServiceImpl.saveProduct(..)) && args(product)")
	public Object trackChange(ProceedingJoinPoint pjp, Product product) throws Throwable {
		
		log.debug("2 AOP >>> method call intercept, before saveProduct " + product);
		
		final List<String> chg = recordChanges(product);
		
		final Product p = (Product) pjp.proceed(new Object[] { product });
		
		log.debug("2 AOP >>> method call intercept, after saveProduct " + product);
		
		return new ProductAndLatestChange(p.getId(), p.getCode(), p.getName(), p.getDesc(), p.getDetails(), chg);
	}		
	
	private List<String> recordChanges(Product n) {
		Product o = productRepository.get(n.getId());
		
		if (o == null) return null;
		
		if (o.getId() == null || !o.getId().equals(n.getId())) {
			return null;
		}
		
		ProductHistory hist = productHistoryRepository.get(o.getId());
		if (hist == null) {
			hist = new ProductHistory(o.getId());
		}
		
		List<String> changes = new ArrayList<String>();
		
		boolean hasChanged = false;
		if (o.getCode() == null || !o.getCode().equals(n.getCode())) {
			hasChanged = true;
			hist.addCommon(new ChangeType("code", o.getCode(), n.getCode()));
			
			changes.add("The Barcode changed from \"" + o.getCode() + "\" to \"" + n.getCode() + "\"");
		}
		
		if (o.getName() == null || !o.getName().equals(n.getName())) {
			hasChanged = true;
			hist.addCommon(new ChangeType("name", o.getName(), n.getName()));
			
			changes.add("The Product Name changed from \"" + o.getName() + "\" to \"" + n.getName() + "\"");			
		}
	
		if (o.getDesc() == null || !o.getDesc().equals(n.getDesc())) {
			hasChanged = true;
			hist.addCommon(new ChangeType("desc", o.getDesc(), n.getDesc()));
			
			changes.add("The Product Description changed from \"" + o.getDesc() + "\" to \"" + n.getDesc() + "\"");			
		}		
		
		if (o.getDetails() != null && n.getDetails() != null) {
			for (CodeValue i : n.getDetails()) {
				for (CodeValue j : o.getDetails()) {
					if (j.getCode().equals(i.getCode()) && !j.getValue().equals(i.getValue())) {
						hist.addUndefined(new ChangeType(j.getCode(), j.getValue(), i.getValue()));
						hasChanged = true;
						
						changes.add("The " + j.getCode() + " changed from \"" + j.getValue() + "\" to \"" + i.getValue() + "\"");
						break;
					}
				}
			}
		}
		
		if (hasChanged) {
			productHistoryRepository.save(hist);
		}
		
		return changes;
	}	
}
