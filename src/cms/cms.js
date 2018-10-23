import CMS from 'netlify-cms';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import PrivacyPolicyPreview from './preview-templates/PrivacyPolicyPreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';

CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('privacy-policy', PrivacyPolicyPreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
