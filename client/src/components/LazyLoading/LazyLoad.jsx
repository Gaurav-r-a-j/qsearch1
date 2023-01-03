// import React from 'react';

// const LazyLoad = ({ src, alt, ...props }, ref) => {
//   const [image, setImage] = React.useState(null);

//   React.useEffect(() => {
//     let cancelled = false;

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (!cancelled && entry.isIntersecting) {
//           const img = new Image();
//           img.src = src;
//           img.onload = () => setImage(img);
//           observer.unobserve(ref.current);
//         }
//       });
//     });

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       cancelled = true;
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [src]);

//   return <img ref={ref} src={image ? image.src : null} alt={alt} {...props} />;
// };

// export default React.forwardRef(LazyLoad);




//!with debouncing

import React from 'react';

const LazyLoad = ({ src, alt, placeholder, debounce, ...props }, ref) => {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    let timeoutId = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!cancelled && entry.isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => setImage(img);
          observer.unobserve(ref.current);
        }
      });
    });

    const onIntersection = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      }, debounce);
    };

    if (ref.current) {
      onIntersection();
    }

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [src, debounce]);

  return (
    <img
      ref={ref}
      src={image ? image.src : placeholder}
      alt={alt}
      {...props}
    />
  );
};

LazyLoad.defaultProps = {
  debounce: 100,
  placeholder: '',
};

export default React.forwardRef(LazyLoad);

