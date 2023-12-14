
$(function () {
    // Display the current date at the top of the calendar
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

    // Present with time blocks for standard business hours of 9 AM to 5 PM
    for (let hour = 9; hour <= 17; hour++) {
        let timeBlockId = 'hour:' + hour;
        let timeBlock = $('<div>').addClass('row time-block').attr('id', timeBlockId);
        let hourTag = $('<div>').addClass('col-md-1 hour').text(`${hour <= 12 ? hour : hour - 12}${hour < 12 ? 'AM' : 'PM'}`);
        let workInput = $('<textarea>').addClass('col-md-10 description').val(localStorage.getItem(timeBlockId) || '');
        let saveBtn = $('<button>').addClass('col-md-1 saveBtn').html('<i class="fas fa-save"></i>');

        // Add child elements to each time block
        timeBlock.append(hourTag, workInput, saveBtn);
        $('#plannerContainer').append(timeBlock);

        // Decide a time block to be past, present, or future
        updateColorCoding(timeBlock, hour);
    }

    // Add event to save buttons
    $('.saveBtn').click(function() {
        let timeBlockId = $(this).parent().attr('id');
        let workDescription = $(this).siblings('.description').val();
    // Save text for that event in local storage
        localStorage.setItem(timeBlockId, workDescription);
    });

    
    function updateColorCoding(timeBlock, hour) {
        let currentHour = dayjs().hour();
        timeBlock.removeClass('past present future');
        if (hour < currentHour) {
            timeBlock.addClass('past');
        } else if (hour === currentHour) {
            timeBlock.addClass('present');
        } else {
            timeBlock.addClass('future');
        }
    }

    // Update color coding every second
    setInterval(function() {
        $('.time-block').each(function() {
            let hour = parseInt($(this).attr('id').replace('hour:', ''));
            updateColorCoding($(this), hour);
        });
    }, 1000);
});
