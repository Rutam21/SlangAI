document.addEventListener('DOMContentLoaded', () => {
    //Initiate a Shepherd Tour Element
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            modal: true,
            scrollTo: { behavior: 'smooth', block: 'center' }
        },
        useModalOverlay: true
    });
  
    //Define the steps for the tour along with their targets
    tour.addStep({
      title: 'Welcome to SlangAI',
      text: 'This app helps its users to easily understand the GenZ slangs.',
      attachTo: {
        element: '#brandname',
        on: 'bottom'
      },
      buttons: [
        {
            text: 'Exit',
            action: tour.cancel
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });
  
    tour.addStep({
      title: 'Know the Slang',
      text: 'In this section you can input a Slang term and the underlying AI Models will fetch you its full-form and the meaning.',
      attachTo: {
        element: '#slangInput',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep({
        title: 'Daily Slangs',
        text: 'In this section you will learn 4 new GenZ slangs every day along with their meaning and an example sentence showcasing their usage.',
        attachTo: {
          element: '#slangSlider',
          on: 'left'
        },
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep({
        title: 'Slangtence',
        text: 'In this section you can generate a random sentence that is made up of GenZ slang terms and learn what it means.',
        attachTo: {
          element: '#slangtenceBox',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Next',
            action: tour.next
          }
        ]
      });

      tour.addStep({
        title: 'Slang On',
        text: 'Start your GenZ Slang learning journey now.',
        attachTo: {
          element: '#appStart',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: tour.back
          },
          {
            text: 'Done',
            action: tour.complete
          }
        ]
      });
  
    tour.start(); //Start the App Tour
  });
  