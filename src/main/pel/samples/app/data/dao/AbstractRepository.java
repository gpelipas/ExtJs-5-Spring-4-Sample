package pel.samples.app.data.dao;

import java.util.List;

public interface AbstractRepository<T> {
	
	List<T> list();
	T get(String id);
	T save(T e);
	void delete(T e);
	
}
