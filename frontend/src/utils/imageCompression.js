/**
 * Nén ảnh ở client-side trước khi upload
 * @param {File} file - File ảnh gốc
 * @param {Object} options - Tùy chọn nén
 * @param {number} options.quality - Chất lượng ảnh (0-1), mặc định 0.8
 * @param {number} options.maxWidth - Chiều rộng tối đa (null = giữ nguyên)
 * @param {number} options.maxHeight - Chiều cao tối đa (null = giữ nguyên)
 * @returns {Promise<File>} - File ảnh đã nén
 */
export const compressImage = async (file, options = {}) => {
  const {
    quality = 0.8,
    maxWidth = null,
    maxHeight = null,
  } = options;

  // Nếu không phải ảnh thì return luôn
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        // Resize nếu cần (giữ tỷ lệ)
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Chuyển canvas thành blob với quality đã nén
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Nén ảnh thất bại'));
              return;
            }
            
            // Tạo File mới từ blob
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            
            console.log(`Nén ảnh: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Không thể load ảnh'));
      img.src = e.target.result;
    };
    
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Nén nhiều ảnh cùng lúc
 */
export const compressImages = async (files, options = {}) => {
  const promises = Array.from(files).map(file => compressImage(file, options));
  return Promise.all(promises);
};

