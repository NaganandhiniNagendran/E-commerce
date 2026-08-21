package E_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import E_commerce.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
