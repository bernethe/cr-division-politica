(function() {
	var dt,dtL;
	function cargarDatos(eCD) {
		dtL = $.getJSON('../distritos.min.json',yaCargo);
	}
	function yaCargo(eYC) {
		dt = eYC;
		cambiaSelect('#provincia_txt',dt.provincias);
		cambiaSelect('#canton_txt',dt.provincias[0].cantones);
		cambiaSelect('#distrito_txt',dt.provincias[0].cantones[0].distritos);

		$('#provincia_txt').on('change',changeMe);
		$('#canton_txt').on('change',changeMe);
	}
	function changeMe(eCM) {
		if($(eCM.currentTarget).attr('name') == 'provincia_txt') {
			cambiaSelect(
				'#canton_txt',
				dt.provincias[$('#provincia_txt').val()].cantones
			);
			cambiaSelect(
				'#distrito_txt',
				dt.provincias[$('#provincia_txt').val()].cantones[$('#canton_txt').val()].distritos
			);
		} else {
			cambiaSelect(
				'#distrito_txt',
				dt.provincias[$('#provincia_txt').val()].cantones[$('#canton_txt').val()].distritos
			);
		}
	}
	function cambiaSelect(obj,pob) {
		$(obj).find('option').remove().end();
		for (var i = 0; i < pob.length; i++) {
			$(obj).append($("<option></option>").attr("value",i).text(pob[i].title));
		}
	}
	$(document).on('ready',cargarDatos);
})();