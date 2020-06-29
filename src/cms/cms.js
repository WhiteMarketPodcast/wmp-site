import 'style/sass/all.sass'

import CMS from 'netlify-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import FMACollectionPreview from './preview-templates/FMACollectionPreview'
import PrivacyPolicyPreview from './preview-templates/PrivacyPolicyPreview'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('fma-collection', FMACollectionPreview)
CMS.registerPreviewTemplate('privacy-policy', PrivacyPolicyPreview)
