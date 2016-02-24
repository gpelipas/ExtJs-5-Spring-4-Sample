package pel.samples.app.data.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Product {

	private String id;
	private String code;
	private String name;
	private String desc;
	private final List<CodeValue> details = new ArrayList<CodeValue>();

	public Product() {
	}

	public Product(String code, String name, String desc) {
		this.code = code;
		this.name = name;
		this.desc = desc;
	}

	public Product(String code, String name, String desc, List<CodeValue> dtls) {
		this.code = code;
		this.name = name;
		this.desc = desc;
		addDetails(dtls);
	}	
	
	public String getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public void addDetail(CodeValue cv) {
		details.add(cv);
	}

	public void refreshDetails(List<CodeValue> dtls) {
		if (dtls != null && dtls.size() > 0) {
			details.addAll(dtls);	
		}
	}	
	
	public void addDetails(List<CodeValue> dtls) {
		if (dtls != null) {
			details.addAll(dtls);	
		}
	}
	
	public List<CodeValue> getDetails() {
		return Collections.unmodifiableList(details);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
	@Override
	public String toString() {
		return "Product [id=" + id + ", code=" + code + ", name=" + name
				+ ", desc=" + desc + "]";
	}

	public static class CodeValue {
		private String code;
		private String value;

		public CodeValue() {
		}		
		
		public CodeValue(String code, String value) {
			super();
			this.code = code;
			this.value = value;
		}

		public String getCode() {
			return code;
		}

		public void setCode(String code) {
			this.code = code;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}
}
