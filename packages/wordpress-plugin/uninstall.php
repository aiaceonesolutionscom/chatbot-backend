<?php
/**
 * Uninstallation cleanup for Universal AI Commerce Chatbot
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

delete_option('uac_chatbot_enabled');
delete_option('uac_chatbot_site_key');
delete_option('uac_chatbot_api_url');
delete_option('uac_chatbot_position');
delete_option('uac_chatbot_color');
delete_option('uac_chatbot_whatsapp');
