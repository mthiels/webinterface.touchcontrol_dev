/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-home' : '&#xe000;',
			'icon-droplet' : '&#xe001;',
			'icon-image' : '&#xe002;',
			'icon-image-2' : '&#xe003;',
			'icon-paint-format' : '&#xe004;',
			'icon-camera' : '&#xe005;',
			'icon-music' : '&#xe006;',
			'icon-headphones' : '&#xe007;',
			'icon-play' : '&#xe008;',
			'icon-film' : '&#xe009;',
			'icon-camera-2' : '&#xe00a;',
			'icon-pacman' : '&#xe00b;',
			'icon-bullhorn' : '&#xe00c;',
			'icon-connection' : '&#xe00d;',
			'icon-feed' : '&#xe00e;',
			'icon-podcast' : '&#xe00f;',
			'icon-book' : '&#xe010;',
			'icon-library' : '&#xe011;',
			'icon-barcode' : '&#xe012;',
			'icon-qrcode' : '&#xe013;',
			'icon-ticket' : '&#xe014;',
			'icon-cart' : '&#xe015;',
			'icon-coin' : '&#xe016;',
			'icon-credit' : '&#xe017;',
			'icon-support' : '&#xe018;',
			'icon-phone' : '&#xe019;',
			'icon-phone-hang-up' : '&#xe01a;',
			'icon-notebook' : '&#xe01b;',
			'icon-envelop' : '&#xe01c;',
			'icon-location' : '&#xe01d;',
			'icon-location-2' : '&#xe01e;',
			'icon-compass' : '&#xe01f;',
			'icon-history' : '&#xe020;',
			'icon-clock' : '&#xe021;',
			'icon-alarm' : '&#xe022;',
			'icon-bell' : '&#xe023;',
			'icon-stopwatch' : '&#xe024;',
			'icon-calendar' : '&#xe025;',
			'icon-print' : '&#xe026;',
			'icon-keyboard' : '&#xe027;',
			'icon-mobile' : '&#xe028;',
			'icon-mobile-2' : '&#xe029;',
			'icon-tablet' : '&#xe02a;',
			'icon-tv' : '&#xe02b;',
			'icon-cabinet' : '&#xe02c;',
			'icon-box-add' : '&#xe02d;',
			'icon-box-remove' : '&#xe02e;',
			'icon-download' : '&#xe02f;',
			'icon-upload' : '&#xe030;',
			'icon-disk' : '&#xe031;',
			'icon-undo' : '&#xe032;',
			'icon-redo' : '&#xe033;',
			'icon-undo-2' : '&#xe034;',
			'icon-redo-2' : '&#xe035;',
			'icon-forward' : '&#xe036;',
			'icon-reply' : '&#xe037;',
			'icon-bubble' : '&#xe038;',
			'icon-bubble-2' : '&#xe039;',
			'icon-user' : '&#xe03a;',
			'icon-users' : '&#xe03b;',
			'icon-user-2' : '&#xe03c;',
			'icon-spinner' : '&#xe03d;',
			'icon-spinner-2' : '&#xe03e;',
			'icon-spinner-3' : '&#xe03f;',
			'icon-spinner-4' : '&#xe040;',
			'icon-spinner-5' : '&#xe041;',
			'icon-binoculars' : '&#xe042;',
			'icon-search' : '&#xe043;',
			'icon-zoom-in' : '&#xe044;',
			'icon-zoom-out' : '&#xe045;',
			'icon-expand' : '&#xe046;',
			'icon-contract' : '&#xe047;',
			'icon-expand-2' : '&#xe048;',
			'icon-contract-2' : '&#xe049;',
			'icon-key' : '&#xe04a;',
			'icon-lock' : '&#xe04b;',
			'icon-unlocked' : '&#xe04c;',
			'icon-wrench' : '&#xe04d;',
			'icon-settings' : '&#xe04e;',
			'icon-equalizer' : '&#xe04f;',
			'icon-cog' : '&#xe050;',
			'icon-cogs' : '&#xe051;',
			'icon-cog-2' : '&#xe052;',
			'icon-wand' : '&#xe053;',
			'icon-bug' : '&#xe054;',
			'icon-gift' : '&#xe055;',
			'icon-trophy' : '&#xe056;',
			'icon-mug' : '&#xe057;',
			'icon-rocket' : '&#xe058;',
			'icon-meter2' : '&#xe059;',
			'icon-dashboard' : '&#xe05a;',
			'icon-fire' : '&#xe05b;',
			'icon-remove' : '&#xe05c;',
			'icon-target' : '&#xe05d;',
			'icon-shield' : '&#xe05e;',
			'icon-lightning' : '&#xe05f;',
			'icon-switch' : '&#xe060;',
			'icon-list' : '&#xe061;',
			'icon-tree' : '&#xe062;',
			'icon-cloud' : '&#xe063;',
			'icon-cloud-download' : '&#xe064;',
			'icon-cloud-upload' : '&#xe065;',
			'icon-globe' : '&#xe066;',
			'icon-earth' : '&#xe067;',
			'icon-link' : '&#xe068;',
			'icon-attachment' : '&#xe069;',
			'icon-eye-blocked' : '&#xe06a;',
			'icon-eye' : '&#xe06b;',
			'icon-brightness-medium' : '&#xe06c;',
			'icon-brightness-contrast' : '&#xe06d;',
			'icon-star' : '&#xe06e;',
			'icon-star-2' : '&#xe06f;',
			'icon-star-3' : '&#xe070;',
			'icon-heart' : '&#xe071;',
			'icon-heart-2' : '&#xe072;',
			'icon-thumbs-up' : '&#xe073;',
			'icon-thumbs-up-2' : '&#xe074;',
			'icon-point-right' : '&#xe075;',
			'icon-point-left' : '&#xe076;',
			'icon-point-down' : '&#xe077;',
			'icon-point-up' : '&#xe078;',
			'icon-warning' : '&#xe079;',
			'icon-notification' : '&#xe07a;',
			'icon-info' : '&#xe07b;',
			'icon-info-2' : '&#xe07c;',
			'icon-question' : '&#xe07d;',
			'icon-blocked' : '&#xe07e;',
			'icon-cancel-circle' : '&#xe07f;',
			'icon-checkmark-circle' : '&#xe080;',
			'icon-spam' : '&#xe081;',
			'icon-close' : '&#xe082;',
			'icon-checkmark' : '&#xe083;',
			'icon-minus' : '&#xe084;',
			'icon-plus' : '&#xe085;',
			'icon-exit' : '&#xe086;',
			'icon-enter' : '&#xe087;',
			'icon-play-2' : '&#xe088;',
			'icon-pause' : '&#xe089;',
			'icon-stop' : '&#xe08a;',
			'icon-backward' : '&#xe08b;',
			'icon-forward-2' : '&#xe08c;',
			'icon-play-3' : '&#xe08d;',
			'icon-pause-2' : '&#xe08e;',
			'icon-stop-2' : '&#xe08f;',
			'icon-backward-2' : '&#xe090;',
			'icon-forward-3' : '&#xe091;',
			'icon-first' : '&#xe092;',
			'icon-last' : '&#xe093;',
			'icon-previous' : '&#xe094;',
			'icon-next' : '&#xe095;',
			'icon-eject' : '&#xe096;',
			'icon-volume-high' : '&#xe097;',
			'icon-volume-medium' : '&#xe098;',
			'icon-volume-low' : '&#xe099;',
			'icon-volume-mute' : '&#xe09a;',
			'icon-volume-mute-2' : '&#xe09b;',
			'icon-volume-increase' : '&#xe09c;',
			'icon-volume-decrease' : '&#xe09d;',
			'icon-loop' : '&#xe09e;',
			'icon-loop-2' : '&#xe09f;',
			'icon-loop-3' : '&#xe0a0;',
			'icon-shuffle' : '&#xe0a1;',
			'icon-arrow-up-left' : '&#xe0a2;',
			'icon-arrow-up' : '&#xe0a3;',
			'icon-arrow-up-right' : '&#xe0a4;',
			'icon-arrow-right' : '&#xe0a5;',
			'icon-arrow-down-right' : '&#xe0a6;',
			'icon-arrow-down' : '&#xe0a7;',
			'icon-arrow-down-left' : '&#xe0a8;',
			'icon-arrow-left' : '&#xe0a9;',
			'icon-arrow-up-left-2' : '&#xe0aa;',
			'icon-arrow-up-2' : '&#xe0ab;',
			'icon-arrow-up-right-2' : '&#xe0ac;',
			'icon-arrow-right-2' : '&#xe0ad;',
			'icon-arrow-down-right-2' : '&#xe0ae;',
			'icon-arrow-down-2' : '&#xe0af;',
			'icon-arrow-down-left-2' : '&#xe0b0;',
			'icon-arrow-left-2' : '&#xe0b1;',
			'icon-arrow-up-left-3' : '&#xe0b2;',
			'icon-arrow-up-3' : '&#xe0b3;',
			'icon-arrow-up-right-3' : '&#xe0b4;',
			'icon-arrow-right-3' : '&#xe0b5;',
			'icon-arrow-down-right-3' : '&#xe0b6;',
			'icon-arrow-down-3' : '&#xe0b7;',
			'icon-arrow-down-left-3' : '&#xe0b8;',
			'icon-arrow-left-3' : '&#xe0b9;',
			'icon-tab' : '&#xe0ba;',
			'icon-checkbox-checked' : '&#xe0bb;',
			'icon-checkbox-unchecked' : '&#xe0bc;',
			'icon-radio-checked' : '&#xe0bd;',
			'icon-radio-unchecked' : '&#xe0be;',
			'icon-scissors' : '&#xe0bf;',
			'icon-table' : '&#xe0c0;',
			'icon-new-tab' : '&#xe0c1;',
			'icon-console' : '&#xe0c2;',
			'icon-mail' : '&#xe0c3;',
			'icon-mail-2' : '&#xe0c4;',
			'icon-mail-3' : '&#xe0c5;',
			'icon-mail-4' : '&#xe0c6;',
			'icon-google-plus' : '&#xe0c7;',
			'icon-google-drive' : '&#xe0c8;',
			'icon-feed-2' : '&#xe0c9;',
			'icon-feed-3' : '&#xe0ca;',
			'icon-feed-4' : '&#xe0cb;',
			'icon-flickr' : '&#xe0cc;',
			'icon-flickr-2' : '&#xe0cd;',
			'icon-flickr-3' : '&#xe0ce;',
			'icon-flickr-4' : '&#xe0cf;',
			'icon-tux' : '&#xe0d0;',
			'icon-apple' : '&#xe0d1;',
			'icon-finder' : '&#xe0d2;',
			'icon-android' : '&#xe0d3;',
			'icon-windows' : '&#xe0d4;',
			'icon-youtube' : '&#xe0d5;',
			'icon-youtube-2' : '&#xe0d6;',
			'icon-remove-2' : '&#xe0d7;',
			'icon-flag' : '&#xe0d8;',
			'icon-bookmark' : '&#xe0d9;',
			'icon-warning-2' : '&#xe0da;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};