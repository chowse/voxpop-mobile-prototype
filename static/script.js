

(function($) {
	$.fn.tabs = function() {
		var self = this;
		var curTab = this.find('.selected').get(0);
		var curPage = $(curTab).tabPage().get(0);
		
		return this.delegate('a', 'click', function(e) {
			if (this == curTab) return false;
			
			$([ curTab, curPage ]).removeClass('selected');
			curTab = this;
			curPage = $(curTab).tabPage().get(0);
			$([ curTab, curPage ]).addClass('selected');
			
			return false;
		});
	};
	
	$.fn.tabPage = function() {
		var hash = $(this).attr('href').replace(/^.*#/, '');
		return $('#'+hash);
	};
	
	
	$.fn.choice = function() {
		this.each(syncLabel);
		return this.change(syncLabel);
		
		function syncLabel() {
			var label = $('option:selected', this).text();
			$('span', this).text(label);
		}
	};
	
	
	$.fn.expander = function() {
		return this.click(function(e) {
			var from = $(this);
			var to = $('#' + from.attr('data-for'));
			from.toggleClass('expanded');
			to.toggleClass('expanded');
			return false;
		});
	};
	
	
	$(function() {
		$('#m-tabs').tabs();
		$('.choice').choice();
		
		$('#m-search').submit(function() {
			$('#m-search').addClass('active');
			$('#m-search-input').blur();
			alert('Search for "' + $('#m-search-input').val() + '"');
			return false;
		});

		$('#m-search-clear').click(function() {
			$('#m-search').removeClass('active');
			$('#m-search-input').val('');
			alert('Search cleared');
			return false;
		});

		$('#m-filter-clear').click(function() {
			$('#m-filters').removeClass('active');
			$('#m-stats .cell').removeClass('selected');
			alert('Removing filters');
			return false;
		});
		
		$('.expander').expander();
		
		$('#m-stats').delegate('.search', 'click', function() {
			var cell = $(this).closest('.cell');
			var term = cell.find('.s strong').text();
			
			if (cell.hasClass('selected')) {
				$('#m-filter-clear').click();
				return false;
			}
			
			cell.addClass('selected');
			$('#m-filters').toggleClass('active');
			$('#m-filters strong').text(term);
			
			alert('Showing only ' + term);
			return false;
		});
		
		$('#m-trends').delegate('.search', 'click', function() {
			var term = $(this).closest('.cell').find('.s strong').text();
			$('#m-search-input').val(term);
			$('#m-search').submit();
			return false;
		});
		
		$('#m-settings').change(function() {
			alert('Settings changed');
		});
	});
})(jQuery);
