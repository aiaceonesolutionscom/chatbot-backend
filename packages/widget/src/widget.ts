import { getWidgetStyles } from './styles.js';
import { WooCommerceStorefrontBridge } from './cart/woocommerce-bridge.js';

const COLBOLT_LOGO_BASE64 = 'data:image/png;base64,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';

interface WidgetTenantConfig {
  siteKey: string;
  brand: {
    companyName: string;
    assistantName: string;
    logoUrl?: string;
    primaryColor: string;
    launcherPosition: 'bottom-right' | 'bottom-left';
    welcomeMessage: string;
    suggestedQuestions: string[];
    whatsAppNumber?: string;
  };
  company: {
    businessName: string;
    aboutUs: string;
    shippingPolicy?: string;
  };
  commerceType: string;
  activeTools: string[];
}

export class UniversalCommerceWidget {
  private siteKey: string = 'colbolt_live';
  private apiUrl: string = 'http://localhost:3000';
  private customLogoUrl?: string;
  private shadowRoot!: ShadowRoot;
  private isOpen: boolean = false;
  private isActionMenuOpen: boolean = false;
  private conversationId: string = `conv_${Date.now()}`;
  private config: WidgetTenantConfig | null = null;
  private isWaitingForResponse: boolean = false;
  private cartItems: Array<{ id: string; title: string; price: number; quantity: number }> = [];

  constructor() {
    this.extractAttributes();
  }

  private extractAttributes(): void {
    // 1. Check script tag attributes
    const scripts = document.querySelectorAll('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const script = scripts[i];
      if (script.src && (script.src.includes('widget.js') || script.getAttribute('data-site-key'))) {
        const key = script.getAttribute('data-site-key');
        if (key) this.siteKey = key;

        const api = script.getAttribute('data-api-url');
        if (api) {
          this.apiUrl = api.replace(/\/+$/, '');
        } else {
          try {
            const urlObj = new URL(script.src);
            if (!urlObj.hostname.includes('colbolt.hawksnfox.com')) {
              this.apiUrl = urlObj.origin;
            }
          } catch (e) {
            // Keep default
          }
        }
        break;
      }
    }

    // 2. Check window global configuration
    const winConfig = (window as any).UniversalChatbotConfig;
    if (winConfig) {
      if (winConfig.siteKey) this.siteKey = winConfig.siteKey;
      if (winConfig.apiUrl) this.apiUrl = winConfig.apiUrl.replace(/\/+$/, '');
      if (winConfig.logoUrl) this.customLogoUrl = winConfig.logoUrl;
    }
  }

  public async init(): Promise<void> {
    const hostEl = document.createElement('div');
    hostEl.id = 'universal-chatbot-root';
    document.body.appendChild(hostEl);

    this.shadowRoot = hostEl.attachShadow({ mode: 'open' });

    // Fetch tenant configuration
    await this.fetchConfig();

    // Render Widget into Shadow DOM
    this.render();
    this.bindEvents();

    // Synchronize active WordPress / WooCommerce live cart on page load
    WooCommerceStorefrontBridge.fetchLiveCart().then(liveItems => {
      if (liveItems && liveItems.length > 0) {
        this.cartItems = liveItems;
        this.updateCartUI();
      }
    }).catch(() => {});
  }

  private async fetchConfig(): Promise<void> {
    try {
      const res = await fetch(`${this.apiUrl}/api/tenant/config?siteKey=${encodeURIComponent(this.siteKey)}`);
      if (res.ok) {
        this.config = await res.json();
      }
    } catch (e) {
      console.warn('[UniversalChatbot] Using fallback default config:', e);
    }

    if (!this.config) {
      this.config = {
        siteKey: this.siteKey,
        brand: {
          companyName: 'Colbolt',
          assistantName: 'COLBOLT.',
          logoUrl: this.customLogoUrl || `${this.apiUrl}/static/assistance.gif`,
          primaryColor: '#16408a',
          launcherPosition: 'bottom-right',
          welcomeMessage: 'Hello! Welcome to Colbolt. I can help you find products (like Bacteriostatic Water, Tirz, Retatrutide), check prices within your budget, or add items directly to your cart. How can I help you today?',
          suggestedQuestions: [
            'What does Colbolt do?',
            'Show me Tirz products',
            'What is Bacteriostatic Water?',
            'What are your shipping policies?'
          ]
        },
        company: {
          businessName: 'Colbolt',
          aboutUs: 'Colbolt provides premium quality research solutions and peptides.'
        },
        commerceType: 'woocommerce',
        activeTools: ['search_products', 'add_to_cart', 'tile_calculator']
      };
    } else if (this.customLogoUrl) {
      // Prioritize WordPress plugin-provided logo asset
      this.config.brand.logoUrl = this.customLogoUrl;
    }
  }

  private getAvatarHtml(size: number = 36): string {
    const logoUrl = this.customLogoUrl || this.config?.brand?.logoUrl || `${this.apiUrl}/static/assistance.gif`;
    if (logoUrl) {
      return `<img src="${logoUrl}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;" onerror="this.onerror=null;this.src='${this.apiUrl}/static/assistance.gif';">`;
    }
    return `
      <svg viewBox="0 0 24 24" style="width:${size * 0.6}px;height:${size * 0.6}px;fill:currentColor">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h2a7 7 0 0 1 7 7v1a3 3 0 0 1-3 3h-1.17l-2.41 2.41A2 2 0 0 1 14 21H10a2 2 0 0 1-1.41-.59L6.17 18H5a3 3 0 0 1-3-3v-1a7 7 0 0 1 7-7h2V5.72c-.6-.34-1-.98-1-1.72a2 2 0 0 1 2-2z"/>
      </svg>
    `;
  }

  private getTimeString(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private render(): void {
    const brand = this.config?.brand;
    const primaryColor = brand?.primaryColor || '#1e73be';
    const position = brand?.launcherPosition || 'bottom-right';
    const companyName = brand?.companyName || 'Colbolt';
    const assistantName = brand?.assistantName || 'COLBOLT.';

    const styleEl = document.createElement('style');
    styleEl.textContent = getWidgetStyles(primaryColor, position);
    this.shadowRoot.appendChild(styleEl);

    const container = document.createElement('div');
    container.className = 'chatbot-container';
    container.innerHTML = `
      <!-- High-End Liquid Glass Floating Pill Launcher -->
      <div class="launcher-pill" id="launcherBtn" role="button" tabindex="0" aria-label="Open Chat">
        <div class="launcher-avatar-wrap">
          <div class="launcher-avatar">
            ${this.getAvatarHtml(42)}
          </div>
          <span class="online-badge"></span>
        </div>
        <div class="launcher-text-wrap">
          <div class="launcher-headline">
            <span class="launcher-title">${this.escapeHtml(assistantName || 'Colt AI')}</span>
            <span class="launcher-pill-status">● Live</span>
          </div>
          <div class="launcher-sub">Order & Research Specialist</div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="chat-window hidden" id="chatWindow">
        <!-- Branded Gradient Banner Header (YANA Style) -->
        <div class="chat-header-banner">
          <div class="banner-brand-info">
            <div class="banner-mascot">
              ${this.getAvatarHtml(52)}
            </div>
            <div class="banner-text-group">
              <span class="banner-greeting">Hi, I am</span>
              <span class="banner-assistant-name">${this.escapeHtml(assistantName)}</span>
              <span class="banner-tagline">Research Concierge & Support</span>
            </div>
          </div>
          <div class="banner-controls">
            ${brand?.whatsAppNumber ? `
              <a href="https://wa.me/${brand.whatsAppNumber}" target="_blank" class="banner-btn whatsapp" title="Chat on WhatsApp" rel="noopener noreferrer">
                <svg style="width:17px;height:17px;fill:currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z"/></svg>
              </a>
            ` : ''}
            <button class="banner-btn" id="closeBtn" aria-label="Close Chat">
              <svg style="width:15px;height:15px;fill:currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>

        <!-- Store Sub-Intro Banner -->
        <div class="store-sub-intro">
          <div class="store-title">Welcome to ${this.escapeHtml(companyName)}</div>
          <div class="store-subtitle">Ask anything about compounds, research, live orders, or cart</div>
        </div>

        <!-- Sticky In-Chat Cart Bar (Real-Time Synchronized) -->
        <div class="inchat-cart-strip hidden" id="inchatCartStrip">
          <div class="cart-strip-left" id="cartStripToggle">
            <span class="cart-strip-icon">🛒</span>
            <span class="cart-strip-count" id="cartStripCountText"><strong>0</strong> items</span>
            <span class="cart-strip-total" id="cartStripTotalText">• $0.00</span>
          </div>
          <div class="cart-strip-actions">
            <button class="cart-strip-manage-btn" id="cartStripManageBtn" type="button">Manage</button>
            <a href="https://colbolt.hawksnfox.com/checkout/" target="_blank" class="cart-strip-checkout-btn">Checkout →</a>
          </div>
        </div>

        <!-- Slide-over Cart Drawer / Quick Manager Modal -->
        <div class="cart-drawer hidden" id="cartDrawer">
          <div class="cart-drawer-header">
            <div class="drawer-title-wrap">
              <span class="drawer-icon">🛒</span>
              <span class="drawer-title">Shopping Cart</span>
              <span class="drawer-badge" id="drawerCartBadge">0</span>
            </div>
            <button class="cart-drawer-close-btn" id="closeCartDrawerBtn" type="button" aria-label="Close Cart">✕</button>
          </div>
          <div class="cart-drawer-items" id="cartDrawerItems">
            <!-- Dynamically populated items -->
          </div>
          <div class="cart-drawer-footer">
            <div class="drawer-subtotal-row">
              <span>Estimated Subtotal:</span>
              <span class="drawer-total-price" id="drawerTotalPrice">$0.00</span>
            </div>
            <div class="drawer-cta-row">
              <button class="drawer-clear-btn" id="drawerClearCartBtn" type="button">Empty Cart</button>
              <a href="https://colbolt.hawksnfox.com/checkout/" target="_blank" class="drawer-checkout-btn">Proceed to Checkout 💳</a>
            </div>
          </div>
        </div>

        <!-- Body / Message Thread -->
        <div class="chat-body" id="chatBody">
          <!-- Initial Assistant Message -->
          <div class="message-row assistant">
            <div class="message-avatar">
              ${this.getAvatarHtml(34)}
            </div>
            <div class="message-content-group">
              <div class="message-bubble assistant">
                <p>${brand?.welcomeMessage || 'Hello! How can I assist you today?'}</p>
              </div>
              <span class="message-timestamp">${this.getTimeString()}</span>
              <!-- Initial Suggested Quick Replies -->
              <div class="quick-replies" id="initialSuggestions">
                ${(brand?.suggestedQuestions || []).map(q => `
                  <button class="quick-reply-btn" data-text="${this.escapeHtml(q)}">${this.escapeHtml(q)}</button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Popover Menu (Toggled by + button) -->
        <div class="action-menu hidden" id="actionMenu">
          <button class="action-menu-item" data-action="manage_cart">
            <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
            My Cart & Checkout
          </button>
          <button class="action-menu-item" data-action="all_products">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Browse All Products
          </button>
          <button class="action-menu-item" data-action="track_order">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
            Track My Order
          </button>
          <button class="action-menu-item" data-action="shipping">
            <svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
            Shipping Policy & Timing
          </button>
          <button class="action-menu-item" data-action="clear_chat">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Clear Conversation
          </button>
        </div>

        <!-- Modern Bottom Input Bar (YANA Style with + button) -->
        <div class="chat-footer">
          <div class="input-pill-container">
            <button class="action-plus-btn" id="actionPlusBtn" title="More options" type="button">
              <svg style="width:15px;height:15px;fill:currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <input type="text" class="chat-input" id="chatInput" placeholder="Ask about products, orders, what we do..." autocomplete="off">
            <button class="send-icon-btn" id="sendBtn" aria-label="Send">
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(container);
  }

  private bindEvents(): void {
    const launcherBtn = this.shadowRoot.getElementById('launcherBtn');
    const closeBtn = this.shadowRoot.getElementById('closeBtn');
    const sendBtn = this.shadowRoot.getElementById('sendBtn');
    const actionPlusBtn = this.shadowRoot.getElementById('actionPlusBtn');
    const actionMenu = this.shadowRoot.getElementById('actionMenu');
    const input = this.shadowRoot.getElementById('chatInput') as HTMLInputElement;
    const chatBody = this.shadowRoot.getElementById('chatBody');

    launcherBtn?.addEventListener('click', () => this.toggle());
    closeBtn?.addEventListener('click', () => this.toggle(false));

    actionPlusBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isActionMenuOpen = !this.isActionMenuOpen;
      if (this.isActionMenuOpen) {
        actionMenu?.classList.remove('hidden');
      } else {
        actionMenu?.classList.add('hidden');
      }
    });

    // Close action menu when clicking outside
    chatBody?.addEventListener('click', () => {
      if (this.isActionMenuOpen) {
        this.isActionMenuOpen = false;
        actionMenu?.classList.add('hidden');
      }
    });

    // Action menu item clicks
    actionMenu?.addEventListener('click', (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.action-menu-item') as HTMLElement;
      if (!target) return;
      const action = target.getAttribute('data-action');
      this.isActionMenuOpen = false;
      actionMenu.classList.add('hidden');

      if (action === 'manage_cart') {
        this.openCartDrawer();
      } else if (action === 'track_order') {
        this.sendMessage('Track my order');
      } else if (action === 'all_products') {
        this.sendMessage('Show me all products');
      } else if (action === 'tile_calculator') {
        this.renderTileCalculatorWidget();
      } else if (action === 'shipping') {
        this.sendMessage('What is your shipping policy?');
      } else if (action === 'clear_chat') {
        this.clearChat();
      }
    });

    // In-Chat Cart Bar & Slide-over Drawer Event Listeners
    const cartStripToggle = this.shadowRoot.getElementById('cartStripToggle');
    const cartStripManageBtn = this.shadowRoot.getElementById('cartStripManageBtn');
    const closeCartDrawerBtn = this.shadowRoot.getElementById('closeCartDrawerBtn');
    const drawerClearCartBtn = this.shadowRoot.getElementById('drawerClearCartBtn');
    const cartDrawerItems = this.shadowRoot.getElementById('cartDrawerItems');

    cartStripToggle?.addEventListener('click', () => this.openCartDrawer());
    cartStripManageBtn?.addEventListener('click', () => this.openCartDrawer());
    closeCartDrawerBtn?.addEventListener('click', () => this.closeCartDrawer());
    drawerClearCartBtn?.addEventListener('click', () => this.handleClearAllCart());

    // Direct removal of products from inside the Cart Drawer UI
    cartDrawerItems?.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const removeBtn = target.classList.contains('drawer-item-remove-btn') ? target : target.closest('.drawer-item-remove-btn') as HTMLElement;
      if (removeBtn) {
        const pId = removeBtn.getAttribute('data-product-id');
        const pTitle = removeBtn.getAttribute('data-product-title');
        if (pId) {
          this.handleRemoveFromCart(pId, pTitle || 'Item');
        }
      }
    });

    sendBtn?.addEventListener('click', () => this.handleUserSend());
    input?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleUserSend();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.toggle(false);
      }
    });

    // Delegate clicks inside chatBody (quick replies, add to cart, tile calc, qty picker)
    chatBody?.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('quick-reply-btn')) {
        const text = target.getAttribute('data-text');
        if (text) this.sendMessage(text);
      } else if (target.classList.contains('add-to-cart-btn') || target.closest('.add-to-cart-btn')) {
        const btn = target.classList.contains('add-to-cart-btn') ? target : target.closest('.add-to-cart-btn') as HTMLElement;
        const productId = btn.getAttribute('data-product-id');
        const card = btn.closest('.product-card');
        const qtyDisplay = card?.querySelector('.qty-display');
        const qty = qtyDisplay ? parseInt(qtyDisplay.textContent || '1', 10) : 1;

        if (productId) {
          this.handleAddToCart(btn, productId, qty);
        }
      } else if (target.classList.contains('qty-btn')) {
        const isPlus = target.getAttribute('data-action') === 'plus';
        const display = target.parentElement?.querySelector('.qty-display');
        if (display) {
          let val = parseInt(display.textContent || '1', 10);
          val = isPlus ? val + 1 : Math.max(1, val - 1);
          display.textContent = String(val);
        }
      } else if (target.classList.contains('tile-calc-submit-btn')) {
        this.handleTileCalculation(target);
      }
    });
  }

  public toggle(forceState?: boolean): void {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    const chatWindow = this.shadowRoot.getElementById('chatWindow');
    const launcherBtn = this.shadowRoot.getElementById('launcherBtn');
    const input = this.shadowRoot.getElementById('chatInput') as HTMLInputElement;

    if (this.isOpen) {
      chatWindow?.classList.remove('hidden');
      if (launcherBtn) launcherBtn.style.opacity = '0.9';
      setTimeout(() => input?.focus(), 150);
    } else {
      chatWindow?.classList.add('hidden');
      if (launcherBtn) launcherBtn.style.opacity = '1';
    }
  }

  private handleUserSend(): void {
    const input = this.shadowRoot.getElementById('chatInput') as HTMLInputElement;
    const text = input.value.trim();
    if (!text || this.isWaitingForResponse) return;

    input.value = '';
    this.sendMessage(text);
  }

  public async sendMessage(text: string): Promise<void> {
    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (!chatBody) return;

    // Append User Bubble with timestamp
    const userRow = document.createElement('div');
    userRow.className = 'message-row user';
    userRow.innerHTML = `
      <div class="message-content-group">
        <div class="message-bubble user">${this.escapeHtml(text)}</div>
        <span class="message-timestamp">${this.getTimeString()}</span>
      </div>
    `;
    chatBody.appendChild(userRow);

    // Append Typing Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'activeTypingIndicator';
    typingIndicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    this.isWaitingForResponse = true;

    try {
      const res = await fetch(`${this.apiUrl}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Site-Key': this.siteKey
        },
        body: JSON.stringify({
          siteKey: this.siteKey,
          conversationId: this.conversationId,
          message: text,
          cartItems: this.cartItems
        })
      });

      typingIndicator.remove();
      this.isWaitingForResponse = false;

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      this.renderBotResponse(data);
    } catch (err) {
      typingIndicator.remove();
      this.isWaitingForResponse = false;
      this.renderBotResponse({
        message: 'I am currently having trouble reaching the store catalog. Please try again in a moment.'
      });
    }
  }

  private renderBotResponse(data: any): void {
    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (!chatBody) return;

    // Handle bidirectional real-time Cart Actions triggered by conversational AI
    if (data.cartAction) {
      const action = data.cartAction;
      if (action.type === 'remove') {
        WooCommerceStorefrontBridge.executeCartRemoval(action.productId || action.title).catch(() => {});
        this.cartItems = this.cartItems.filter(it => 
          it.id !== String(action.productId) && 
          (!action.title || !it.title.toLowerCase().includes(String(action.title).toLowerCase()))
        );
        this.updateCartUI();
      } else if (action.type === 'add' && action.item) {
        WooCommerceStorefrontBridge.executeCartAddition(action.item.id, action.item.quantity || 1).catch(() => {});
        const exist = this.cartItems.find(it => it.id === String(action.item.id));
        if (exist) {
          exist.quantity += (action.item.quantity || 1);
        } else {
          this.cartItems.push({
            id: String(action.item.id),
            title: action.item.title,
            price: Number(action.item.price || 0),
            quantity: action.item.quantity || 1
          });
        }
        this.updateCartUI();
      } else if (action.type === 'update' && action.item) {
        WooCommerceStorefrontBridge.executeCartUpdate(action.item.id, action.item.quantity).catch(() => {});
        const exist = this.cartItems.find(it => it.id === String(action.item.id));
        if (exist) {
          exist.quantity = action.item.quantity;
        }
        this.updateCartUI();
      } else if (action.type === 'clear') {
        WooCommerceStorefrontBridge.clearStoreCart().catch(() => {});
        this.cartItems = [];
        this.updateCartUI();
      }
    }

    const botRow = document.createElement('div');
    botRow.className = 'message-row assistant';

    const formattedMessage = this.formatMarkdown(data.message || '');
    let cardsHtml = '';

    if (Array.isArray(data.productCards) && data.productCards.length > 0) {
      cardsHtml = `
        <div class="product-cards-container">
          ${data.productCards.map((p: any) => `
            <div class="product-card">
              ${p.featuredImage ? `
                <div class="product-img-wrap">
                  <img class="product-img" src="${p.featuredImage}" alt="${this.escapeHtml(p.title)}" loading="lazy">
                  <span class="product-stock-tag">${p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              ` : ''}
              <div class="product-details">
                <span class="product-title">${this.escapeHtml(p.title)}</span>
                <div class="product-price-row">
                  <span class="product-price">${p.price?.formatted || '$0.00'}</span>
                </div>
                <div class="product-actions">
                  <div class="qty-picker">
                    <button class="qty-btn" data-action="minus" aria-label="Decrease quantity">-</button>
                    <span class="qty-display">1</span>
                    <button class="qty-btn" data-action="plus" aria-label="Increase quantity">+</button>
                  </div>
                  <button class="add-to-cart-btn" data-product-id="${p.id}">
                    <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    let quickRepliesHtml = '';
    if (Array.isArray(data.quickReplies) && data.quickReplies.length > 0) {
      quickRepliesHtml = `
        <div class="quick-replies">
          ${data.quickReplies.map((q: any) => `
            <button class="quick-reply-btn" data-text="${this.escapeHtml(q.actionText || q.label)}">${this.escapeHtml(q.label)}</button>
          `).join('')}
        </div>
      `;
    }

    botRow.innerHTML = `
      <div class="message-avatar">
        ${this.getAvatarHtml(34)}
      </div>
      <div class="message-content-group">
        <div class="message-bubble assistant">
          ${formattedMessage}
          ${cardsHtml}
        </div>
        <span class="message-timestamp">${this.getTimeString()}</span>
        ${quickRepliesHtml}
      </div>
    `;

    chatBody.appendChild(botRow);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  public renderTileCalculatorWidget(): void {
    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (!chatBody) return;

    const row = document.createElement('div');
    row.className = 'message-row assistant';
    row.innerHTML = `
      <div class="message-avatar">
        ${this.getAvatarHtml(34)}
      </div>
      <div class="message-content-group" style="width:100%;">
        <div class="message-bubble assistant">
          <p><strong>📐 Interactive Tile & Area Calculator</strong></p>
          <p>Enter your room dimensions to calculate the exact square footage, recommended 10% wastage allowance, and number of boxes required:</p>
          <div class="tile-calc-card">
            <div class="tile-calc-inputs">
              <div class="tile-calc-field">
                <label>Room Length (ft)</label>
                <input type="number" class="tile-input-len" placeholder="e.g. 15" value="15" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Room Width (ft)</label>
                <input type="number" class="tile-input-wid" placeholder="e.g. 12" value="12" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Box Coverage (sq ft)</label>
                <input type="number" class="tile-input-box" placeholder="e.g. 16" value="16" min="1">
              </div>
              <div class="tile-calc-field">
                <label>Wastage Allowance</label>
                <input type="number" class="tile-input-waste" placeholder="%" value="10" min="0" max="30">
              </div>
            </div>
            <button class="tile-calc-btn tile-calc-submit-btn" type="button">Calculate Boxes Needed</button>
            <div class="tile-calc-result"></div>
          </div>
        </div>
        <span class="message-timestamp">${this.getTimeString()}</span>
      </div>
    `;

    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  private handleTileCalculation(btn: HTMLElement): void {
    const card = btn.closest('.tile-calc-card');
    if (!card) return;

    const len = parseFloat((card.querySelector('.tile-input-len') as HTMLInputElement)?.value || '0');
    const wid = parseFloat((card.querySelector('.tile-input-wid') as HTMLInputElement)?.value || '0');
    const boxCov = parseFloat((card.querySelector('.tile-input-box') as HTMLInputElement)?.value || '16');
    const waste = parseFloat((card.querySelector('.tile-input-waste') as HTMLInputElement)?.value || '10');

    const resultEl = card.querySelector('.tile-calc-result') as HTMLElement;
    if (!resultEl) return;

    if (len <= 0 || wid <= 0) {
      resultEl.style.display = 'block';
      resultEl.style.background = '#fef2f2';
      resultEl.style.color = '#991b1b';
      resultEl.style.borderColor = '#fecaca';
      resultEl.textContent = 'Please enter valid room dimensions greater than 0.';
      return;
    }

    const roomArea = len * wid;
    const wasteArea = (roomArea * waste) / 100;
    const totalArea = roomArea + wasteArea;
    const boxes = Math.ceil(totalArea / (boxCov || 16));

    resultEl.style.display = 'block';
    resultEl.style.background = '#f0fdf4';
    resultEl.style.color = '#166534';
    resultEl.style.borderColor = '#bbf7d0';
    resultEl.innerHTML = `
      <strong>Calculation Result:</strong><br>
      • Room Floor Area: <strong>${roomArea.toFixed(1)} sq ft</strong><br>
      • Recommended Wastage (${waste}%): <strong>+${wasteArea.toFixed(1)} sq ft</strong><br>
      • Total Area to Cover: <strong>${totalArea.toFixed(1)} sq ft</strong><br>
      • Boxes Needed (${boxCov} sq ft/box): <strong>${boxes} boxes</strong>
    `;
  }

  private clearChat(): void {
    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (!chatBody) return;
    this.cartItems = [];
    this.conversationId = `conv_${Date.now()}`;
    fetch(`${this.apiUrl}/api/cart/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Site-Key': this.siteKey },
      body: JSON.stringify({ siteKey: this.siteKey, conversationId: this.conversationId })
    }).catch(() => {});

    chatBody.innerHTML = `
      <div class="message-row assistant">
        <div class="message-avatar">
          ${this.getAvatarHtml(34)}
        </div>
        <div class="message-content-group">
          <div class="message-bubble assistant">
            <p>Conversation refreshed! How can I assist you with our catalog today?</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
          <div class="quick-replies">
            <button class="quick-reply-btn" data-text="Show all products">Show all products</button>
            <button class="quick-reply-btn" data-text="What is Bacteriostatic Water?">What is Bacteriostatic Water?</button>
            <button class="quick-reply-btn" data-text="What are your shipping policies?">Shipping Info</button>
          </div>
        </div>
      </div>
    `;
  }

  private async handleAddToCart(buttonEl: HTMLElement, productId: string, quantity: number): Promise<void> {
    if (buttonEl.getAttribute('data-loading') === 'true') return;
    buttonEl.setAttribute('data-loading', 'true');

    const originalText = buttonEl.innerHTML;
    buttonEl.innerHTML = 'Adding...';
    buttonEl.style.opacity = '0.7';

    const card = buttonEl.closest('.product-card');
    const titleEl = card?.querySelector('.product-title');
    const productTitle = titleEl?.textContent?.trim() || 'Selected Product';
    const priceEl = card?.querySelector('.product-price');
    const priceText = priceEl?.textContent?.replace(/[^0-9.]/g, '') || '0';
    const priceNum = parseFloat(priceText) || 0;

    try {
      const result = await WooCommerceStorefrontBridge.executeCartAddition(productId, quantity);
      buttonEl.innerHTML = '✓ Added to Cart';
      buttonEl.classList.add('added');
      buttonEl.style.opacity = '1';

      // Record in local session cart
      const existing = this.cartItems.find(it => it.id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.cartItems.push({ id: productId, title: productTitle, price: priceNum, quantity });
      }
      this.updateCartUI();

      // Notify backend cart endpoint
      fetch(`${this.apiUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Site-Key': this.siteKey
        },
        body: JSON.stringify({
          siteKey: this.siteKey,
          conversationId: this.conversationId,
          productId,
          quantity
        })
      }).catch(() => {});

      // Send confirmation toast in chat
      const chatBody = this.shadowRoot.getElementById('chatBody');
      if (chatBody) {
        const confirmRow = document.createElement('div');
        confirmRow.className = 'message-row assistant';
        confirmRow.innerHTML = `
          <div class="message-avatar">
            ${this.getAvatarHtml(34)}
          </div>
          <div class="message-content-group">
            <div class="message-bubble assistant" style="border-left: 3px solid #16a34a;">
              <p><strong>Item Added!</strong> ${quantity}x added to your cart.</p>
              <p style="margin-top:6px; display:flex; gap:12px;">
                <a href="/cart" style="color:var(--primary); font-weight:700; text-decoration:underline;">View Cart</a>
                <a href="/checkout" style="color:#16a34a; font-weight:700; text-decoration:underline;">Checkout Now</a>
              </p>
            </div>
            <span class="message-timestamp">${this.getTimeString()}</span>
          </div>
        `;
        chatBody.appendChild(confirmRow);
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      setTimeout(() => {
        buttonEl.innerHTML = originalText;
        buttonEl.classList.remove('added');
        buttonEl.removeAttribute('data-loading');
      }, 3500);
    } catch (err) {
      buttonEl.innerHTML = 'Error';
      buttonEl.removeAttribute('data-loading');
      setTimeout(() => { buttonEl.innerHTML = originalText; buttonEl.style.opacity = '1'; }, 2000);
    }
  }

  public updateCartUI(): void {
    const strip = this.shadowRoot.getElementById('inchatCartStrip');
    const stripCountText = this.shadowRoot.getElementById('cartStripCountText');
    const stripTotalText = this.shadowRoot.getElementById('cartStripTotalText');
    const drawerBadge = this.shadowRoot.getElementById('drawerCartBadge');
    const drawerTotalPrice = this.shadowRoot.getElementById('drawerTotalPrice');
    const drawerItemsContainer = this.shadowRoot.getElementById('cartDrawerItems');

    const totalQty = this.cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);
    const totalPrice = this.cartItems.reduce((acc, it) => acc + ((it.price || 0) * (it.quantity || 1)), 0);

    if (strip) {
      if (totalQty > 0) {
        strip.classList.remove('hidden');
        if (stripCountText) stripCountText.innerHTML = `<strong>${totalQty}</strong> ${totalQty === 1 ? 'item' : 'items'}`;
        if (stripTotalText) stripTotalText.textContent = `• $${totalPrice.toFixed(2)}`;
      } else {
        strip.classList.add('hidden');
      }
    }

    if (drawerBadge) drawerBadge.textContent = String(totalQty);
    if (drawerTotalPrice) drawerTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (drawerItemsContainer) {
      if (this.cartItems.length === 0) {
        drawerItemsContainer.innerHTML = `
          <div class="cart-drawer-empty">
            <div style="font-size:32px; margin-bottom:8px;">🛒</div>
            <p style="font-weight:700; color:var(--text-main); font-size:14px;">Your cart is empty</p>
            <p style="font-size:12px; margin-top:4px;">Add research compounds or Bacteriostatic Water to get started.</p>
          </div>
        `;
      } else {
        drawerItemsContainer.innerHTML = this.cartItems.map(item => `
          <div class="cart-drawer-item">
            <div class="drawer-item-info">
              <div class="drawer-item-title" title="${this.escapeHtml(item.title)}">${this.escapeHtml(item.title)}</div>
              <div class="drawer-item-price">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
              <div class="drawer-item-qty">Quantity: <strong>${item.quantity || 1}</strong></div>
            </div>
            <button class="drawer-item-remove-btn" data-product-id="${this.escapeHtml(String(item.id))}" data-product-title="${this.escapeHtml(item.title)}" title="Remove from Cart" aria-label="Remove item">
              <svg style="width:16px;height:16px;fill:currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        `).join('');
      }
    }
  }

  public openCartDrawer(): void {
    const drawer = this.shadowRoot.getElementById('cartDrawer');
    if (drawer) {
      this.updateCartUI();
      drawer.classList.remove('hidden');
    }
  }

  public closeCartDrawer(): void {
    const drawer = this.shadowRoot.getElementById('cartDrawer');
    if (drawer) {
      drawer.classList.add('hidden');
    }
  }

  public async handleRemoveFromCart(productId: string, productTitle: string): Promise<void> {
    const index = this.cartItems.findIndex(it => String(it.id) === String(productId) || it.title.toLowerCase().includes(productTitle.toLowerCase()));
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.updateCartUI();

    // Call WordPress Storefront Bridge to remove from active WooCommerce session
    WooCommerceStorefrontBridge.executeCartRemoval(productId).catch(() => {});

    // Call backend API
    fetch(`${this.apiUrl}/api/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Site-Key': this.siteKey },
      body: JSON.stringify({
        siteKey: this.siteKey,
        conversationId: this.conversationId,
        productId
      })
    }).catch(() => {});

    // Append toast notice in chat
    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (chatBody) {
      const confirmRow = document.createElement('div');
      confirmRow.className = 'message-row assistant';
      confirmRow.innerHTML = `
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ <strong>${this.escapeHtml(productTitle)}</strong> has been removed from your shopping cart.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `;
      chatBody.appendChild(confirmRow);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  public async handleClearAllCart(): Promise<void> {
    this.cartItems = [];
    this.updateCartUI();

    // Call WordPress Storefront Bridge
    WooCommerceStorefrontBridge.clearStoreCart().catch(() => {});

    // Call backend API
    fetch(`${this.apiUrl}/api/cart/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Site-Key': this.siteKey },
      body: JSON.stringify({
        siteKey: this.siteKey,
        conversationId: this.conversationId
      })
    }).catch(() => {});

    setTimeout(() => this.closeCartDrawer(), 300);

    const chatBody = this.shadowRoot.getElementById('chatBody');
    if (chatBody) {
      const confirmRow = document.createElement('div');
      confirmRow.className = 'message-row assistant';
      confirmRow.innerHTML = `
        <div class="message-avatar">${this.getAvatarHtml(34)}</div>
        <div class="message-content-group">
          <div class="message-bubble assistant" style="border-left: 3px solid #dc2626;">
            <p>🗑️ Your shopping cart has been cleared.</p>
          </div>
          <span class="message-timestamp">${this.getTimeString()}</span>
        </div>
      `;
      chatBody.appendChild(confirmRow);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private formatMarkdown(str: string): string {
    let out = this.escapeHtml(str);
    // Bold
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullets
    out = out.replace(/^[•\-\*]\s+(.*)$/gm, '<li>$1</li>');
    out = out.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    // Paragraphs
    out = out.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    return out;
  }
}

// Auto Initialize
if (typeof window !== 'undefined') {
  const widget = new UniversalCommerceWidget();
  (window as any).UniversalChatbot = widget;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => widget.init());
  } else {
    widget.init();
  }
}
