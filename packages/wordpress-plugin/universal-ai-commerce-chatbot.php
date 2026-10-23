<?php
/**
 * Plugin Name: Universal AI Commerce Chatbot
 * Plugin URI:  https://colbolt.hawksnfox.com/
 * Description: Universal multi-tenant AI Shopping & Support Assistant for WooCommerce. Provides real product search, company FAQs, and native Add to Cart integration.
 * Version:     1.1.0
 * Author:      Universal Chatbot Team
 * Author URI:  https://colbolt.hawksnfox.com/
 * License:     GPL-2.0-or-later
 * Text Domain: universal-ai-commerce-chatbot
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * WC requires at least: 5.0
 * WC tested up to:      9.5
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class UniversalAICommerceChatbot {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('wp_footer', array($this, 'render_storefront_widget'));
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_action_links'));
    }

    public function add_action_links($links) {
        $settings_link = '<a href="options-general.php?page=universal-chatbot-settings">' . __('Settings', 'universal-ai-commerce-chatbot') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }

    public function add_admin_menu() {
        add_options_page(
            __('AI Commerce Chatbot', 'universal-ai-commerce-chatbot'),
            __('AI Commerce Chatbot', 'universal-ai-commerce-chatbot'),
            'manage_options',
            'universal-chatbot-settings',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('uac_chatbot_group', 'uac_chatbot_enabled');
        register_setting('uac_chatbot_group', 'uac_chatbot_site_key');
        register_setting('uac_chatbot_group', 'uac_chatbot_api_url');
        register_setting('uac_chatbot_group', 'uac_chatbot_position');
        register_setting('uac_chatbot_group', 'uac_chatbot_color');
        register_setting('uac_chatbot_group', 'uac_chatbot_whatsapp');
    }

    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $enabled     = get_option('uac_chatbot_enabled', '1');
        $site_key    = get_option('uac_chatbot_site_key', 'colbolt_live');
        $api_url     = get_option('uac_chatbot_api_url', 'https://api.hawksnfox.com');
        $position    = get_option('uac_chatbot_position', 'bottom-right');
        $color       = get_option('uac_chatbot_color', '#1e73be');
        $whatsapp    = get_option('uac_chatbot_whatsapp', '');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html__('Universal AI Commerce Chatbot Settings', 'universal-ai-commerce-chatbot'); ?></h1>
            <p><?php echo esc_html__('Configure your AI Shopping & Customer Support assistant for WooCommerce.', 'universal-ai-commerce-chatbot'); ?></p>

            <!-- LIVE CLIENT AI USAGE & ANALYTICS CARD -->
            <div style="background: #ffffff; border: 1px solid #ccd0d4; border-left: 4px solid #2271b1; border-radius: 8px; padding: 18px 24px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: #1d2327;">
                            📊 <?php echo esc_html__('AI Usage & Monthly Statistics', 'universal-ai-commerce-chatbot'); ?> 
                            <span style="font-weight: 400; font-size: 13px; color: #646970;">(Client: <strong><?php echo esc_html($site_key); ?></strong>)</span>
                        </h2>
                    </div>
                    <div id="uac-server-status" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #646970;">
                        <span style="width: 8px; height: 8px; background: #dba617; border-radius: 50%;"></span>
                        Connecting to Backend...
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 14px;">
                    <div style="background: #f6f7f7; padding: 14px 18px; border-radius: 6px; border: 1px solid #dcdcde;">
                        <div style="font-size: 11px; font-weight: 700; color: #646970; text-transform: uppercase; letter-spacing: 0.5px;">Roz Ka Usage (Today)</div>
                        <div id="uac-stat-today" style="font-size: 26px; font-weight: 800; color: #1d2327; margin: 4px 0;">--</div>
                        <div id="uac-stat-today-sub" style="font-size: 12px; color: #50575e;">Calculating...</div>
                    </div>

                    <div style="background: #f6f7f7; padding: 14px 18px; border-radius: 6px; border: 1px solid #dcdcde;">
                        <div style="font-size: 11px; font-weight: 700; color: #646970; text-transform: uppercase; letter-spacing: 0.5px;">Per Mahina Usage (This Month)</div>
                        <div id="uac-stat-month" style="font-size: 26px; font-weight: 800; color: #2271b1; margin: 4px 0;">--</div>
                        <div id="uac-stat-month-sub" style="font-size: 12px; color: #50575e;">Calculating...</div>
                    </div>

                    <div style="background: #f6f7f7; padding: 14px 18px; border-radius: 6px; border: 1px solid #dcdcde;">
                        <div style="font-size: 11px; font-weight: 700; color: #646970; text-transform: uppercase; letter-spacing: 0.5px;">Total Lifetime Conversations</div>
                        <div id="uac-stat-all" style="font-size: 26px; font-weight: 800; color: #1d2327; margin: 4px 0;">--</div>
                        <div style="font-size: 12px; color: #50575e;">All-time customer turns</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f1; padding-top: 12px; font-size: 12px;">
                    <span style="color: #646970;">Server API: <code><?php echo esc_html($api_url); ?></code></span>
                    <a id="uac-admin-dash-btn" href="<?php echo esc_url($api_url); ?>/admin?siteKey=<?php echo esc_attr($site_key); ?>" target="_blank" class="button button-secondary" style="font-size: 12px;">
                        Open Central Admin & Error Logs ↗
                    </a>
                </div>
            </div>

            <script>
            (function() {
                var apiUrl = '<?php echo esc_js($api_url); ?>';
                var siteKey = '<?php echo esc_js($site_key); ?>';
                var statusEl = document.getElementById('uac-server-status');
                var todayEl = document.getElementById('uac-stat-today');
                var todaySubEl = document.getElementById('uac-stat-today-sub');
                var monthEl = document.getElementById('uac-stat-month');
                var monthSubEl = document.getElementById('uac-stat-month-sub');
                var allEl = document.getElementById('uac-stat-all');

                fetch(apiUrl + '/api/analytics/usage?siteKey=' + encodeURIComponent(siteKey))
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        statusEl.innerHTML = '<span style="width:8px;height:8px;background:#00a32a;border-radius:50%;box-shadow:0 0 6px #00a32a;display:inline-block;"></span> <span style="color:#00a32a;">Live & Connected</span>';
                        if (data && data.today) {
                            todayEl.textContent = data.today.messages;
                            todaySubEl.textContent = '~' + Number(data.today.tokens).toLocaleString() + ' tokens today';
                        }
                        if (data && data.thisMonth) {
                            monthEl.textContent = data.thisMonth.messages;
                            monthSubEl.textContent = '~' + Number(data.thisMonth.tokens).toLocaleString() + ' tokens (' + data.thisMonth.month + ')';
                        }
                        if (data && data.allTime) {
                            allEl.textContent = data.allTime.totalMessages;
                        }
                    })
                    .catch(function(err) {
                        statusEl.innerHTML = '<span style="width:8px;height:8px;background:#d63638;border-radius:50%;display:inline-block;"></span> <span style="color:#d63638;">Server Offline</span>';
                        todaySubEl.textContent = 'Could not reach ' + apiUrl;
                        monthSubEl.textContent = 'Check API URL setting';
                    });
            })();
            </script>

            <form method="post" action="options.php">
                <?php settings_fields('uac_chatbot_group'); ?>
                <?php do_settings_sections('uac_chatbot_group'); ?>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><?php echo esc_html__('Enable Chatbot', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="uac_chatbot_enabled" value="1" <?php checked('1', $enabled); ?> />
                                <?php echo esc_html__('Display the AI chatbot widget on the storefront', 'universal-ai-commerce-chatbot'); ?>
                            </label>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><?php echo esc_html__('Chatbot Site Key', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <input type="text" name="uac_chatbot_site_key" value="<?php echo esc_attr($site_key); ?>" class="regular-text" required />
                            <p class="description"><?php echo esc_html__('Your public tenant site key (e.g. colbolt_live).', 'universal-ai-commerce-chatbot'); ?></p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><?php echo esc_html__('Backend API URL', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <input type="url" name="uac_chatbot_api_url" value="<?php echo esc_attr($api_url); ?>" class="regular-text" required />
                            <p class="description"><?php echo esc_html__('The URL of your Node.js Fastify backend server.', 'universal-ai-commerce-chatbot'); ?></p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><?php echo esc_html__('Widget Position', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <select name="uac_chatbot_position">
                                <option value="bottom-right" <?php selected('bottom-right', $position); ?>><?php echo esc_html__('Bottom Right', 'universal-ai-commerce-chatbot'); ?></option>
                                <option value="bottom-left" <?php selected('bottom-left', $position); ?>><?php echo esc_html__('Bottom Left', 'universal-ai-commerce-chatbot'); ?></option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><?php echo esc_html__('Primary Brand Color', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <input type="color" name="uac_chatbot_color" value="<?php echo esc_attr($color); ?>" />
                            <span class="description"><?php echo esc_html__('Used for the launcher, header, and buttons.', 'universal-ai-commerce-chatbot'); ?></span>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><?php echo esc_html__('WhatsApp Shortcut (Optional)', 'universal-ai-commerce-chatbot'); ?></th>
                        <td>
                            <input type="text" name="uac_chatbot_whatsapp" value="<?php echo esc_attr($whatsapp); ?>" class="regular-text" placeholder="+923001234567" />
                            <p class="description"><?php echo esc_html__('Optional WhatsApp number with country code for a direct contact button.', 'universal-ai-commerce-chatbot'); ?></p>
                        </td>
                    </tr>
                </table>

                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    public function render_storefront_widget() {
        $enabled = get_option('uac_chatbot_enabled', '1');
        if ($enabled !== '1') {
            return;
        }

        $site_key = get_option('uac_chatbot_site_key', 'colbolt_live');
        $api_url  = rtrim(get_option('uac_chatbot_api_url', 'https://api.hawksnfox.com'), '/');
        $widget_file = plugin_dir_path(__FILE__) . 'assets/widget.js';
        $ver = file_exists($widget_file) ? filemtime($widget_file) : '1.1.0';
        $plugin_widget_url = plugins_url('assets/widget.js', __FILE__) . '?ver=' . $ver;

        // Generate Store API Nonce for authenticated session cart writes
        $nonce = wp_create_nonce('wc_store_api');

        ?>
        <!-- Universal AI Commerce Chatbot -->
        <script>
            window.UniversalChatbotConfig = {
                siteKey: '<?php echo esc_js($site_key); ?>',
                apiUrl: '<?php echo esc_js($api_url); ?>',
                nonce: '<?php echo esc_js($nonce); ?>',
                storeOrigin: '<?php echo esc_js(get_site_url()); ?>',
                logoUrl: '<?php echo esc_url(plugins_url('assets/assistance.gif', __FILE__)); ?>'
            };
        </script>
        <script 
            src="<?php echo esc_url($plugin_widget_url); ?>" 
            data-site-key="<?php echo esc_attr($site_key); ?>" 
            data-api-url="<?php echo esc_attr($api_url); ?>" 
            async>
        </script>
        <!-- End Universal AI Commerce Chatbot -->
        <?php
    }
}

// Initialize
add_action('plugins_loaded', array('UniversalAICommerceChatbot', 'get_instance'));
