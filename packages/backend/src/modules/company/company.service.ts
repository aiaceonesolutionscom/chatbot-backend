import { TenantConfig } from '@universal-chatbot/shared';

export class CompanyService {
  static getCompanySummary(tenant: TenantConfig): string {
    const { company, brand } = tenant;
    const servicesList = (company.services || []).map(s => `• ${s}`).join('\n');
    const faqsList = (company.faqs || []).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

    return `
=== COMPANY OVERVIEW: ${company.businessName} ===
${company.tagline ? `Tagline: ${company.tagline}\n` : ''}
About Us / Hum Kya Kaam Kartay Hain:
${company.aboutUs}

Industry: ${company.industry}

Services / Core Offerings:
${servicesList}

Shipping & Delivery:
${company.shippingPolicy || 'Standard shipping available.'} ${company.deliveryEstimate ? `Estimated delivery: ${company.deliveryEstimate}` : ''}

Payment Methods:
${(company.paymentMethods || []).join(', ') || 'Online checkout & supported payment methods'}

Returns & Guarantees:
${company.returnPolicy || 'Customer satisfaction supported. Contact support for assistance.'}

Contact & Support:
Email: ${company.supportEmail || 'support@colbolt.com'}
Hours: ${company.businessHours || 'Monday-Friday'}

Frequently Asked Questions (FAQs):
${faqsList}
`.trim();
  }

  static findAnswerForQuery(tenant: TenantConfig, query: string): string | null {
    const qLower = query.toLowerCase();
    const faqs = tenant.company.faqs || [];

    for (const faq of faqs) {
      const faqQ = faq.question.toLowerCase();
      if (qLower.includes(faqQ) || faqQ.includes(qLower)) {
        return faq.answer;
      }
    }

    if (qLower.includes('shipping') || qLower.includes('delivery') || qLower.includes('dispatch') || qLower.includes('deliver')) {
      return `${tenant.company.shippingPolicy || ''} ${tenant.company.deliveryEstimate || ''}`.trim();
    }

    if (qLower.includes('about') || qLower.includes('who are you') || qLower.includes('kya kaam') || qLower.includes('what do you do') || qLower.includes('company')) {
      return `${tenant.company.aboutUs} We specialize in ${tenant.company.industry}.`;
    }

    if (qLower.includes('contact') || qLower.includes('support') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('rabta')) {
      return `You can reach our team at ${tenant.company.supportEmail || 'support'}. Business hours: ${tenant.company.businessHours || 'Monday-Friday'}.`;
    }

    return null;
  }
}
