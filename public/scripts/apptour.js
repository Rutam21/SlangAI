document.addEventListener("DOMContentLoaded", () => {
  // Checks if the tour has been completed and not expired
  const tourCompleteItem = JSON.parse(localStorage.getItem("tour_complete"));
  if (!tourCompleteItem || hasExpired(tourCompleteItem)) {
    apptour.start();
  }
});

const apptour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    modal: true,
    scrollTo: { behavior: "smooth", block: "center" },
  },
  useModalOverlay: true,
});

// Checks if the stored tour_complete item has expired
function hasExpired(item) {
  const now = new Date().getTime();
  return now > item.expiry;
}

// Event listener for tour completion with 1 hour expiry
apptour.on("complete", () => {
  const now = new Date();
  const oneHour = 3600000; // 1 hour in milliseconds

  const item = {
    value: "true",
    expiry: now.getTime() + oneHour,
  };
  localStorage.setItem("tour_complete", JSON.stringify(item));
});


//Steps for the apptour along with their targets
apptour.addStep({
  title: "Welcome to SlangAI",
  text: "This app helps its users to easily understand the GenZ or Social Media slangs.",
  attachTo: {
    element: "#brandname",
    on: "bottom",
  },
  buttons: [
    {
      text: "Exit",
      action: apptour.cancel,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Know the Slang",
  text: "In this section you can input a Slang term and the underlying AI Models will fetch you its full-form and the meaning.",
  attachTo: {
    element: "#slangInput",
    on: "right",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Know the Slang Submit",
  text: "The button stays disabled until you provide a valid input. The input can be a single word only i.e., the Slang term.",
  attachTo: {
    element: "#findSlang",
    on: "right",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slangs of the Day",
  text: "In this section you will learn 4 new GenZ slangs every day along with their meaning and an example sentence showcasing their usage.",
  attachTo: {
    element: "#slangSlider",
    on: "left",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slang Etymology",
  text: "In this section, deep dive into the origins, evolution and cultural impact of a given Slang powered by our AI Models.",
  attachTo: {
    element: "#etymologyInput",
    on: "bottom",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slang Etymology Submit",
  text: "The button stays disabled until you provide a valid input. The input can be a single word only i.e., the Slang term.",
  attachTo: {
    element: "#findSlangEtymology",
    on: "left",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slangslator",
  text: "In this section, paraphrase or convert a sentence with slangs to standard English using our powerful AI Models.",
  attachTo: {
    element: "#slangslatorInput",
    on: "top",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slangslator Submit",
  text: "The button stays disabled until you provide a valid input. The input can be a valid sentence(s) containing one or more slang terms.",
  attachTo: {
    element: "#getSlangslator",
    on: "right",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slangtence",
  text: "In this section you can generate a random sentence that is made up of GenZ slang terms.",
  attachTo: {
    element: "#slangtenceBox",
    on: "bottom",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Next",
      action: apptour.next,
    },
  ],
});

apptour.addStep({
  title: "Slang On",
  text: "Start your GenZ Slang learning journey now.",
  attachTo: {
    element: "#appStart",
    on: "bottom",
  },
  buttons: [
    {
      text: "Back",
      action: apptour.back,
    },
    {
      text: "Done",
      action: apptour.complete,
    },
  ],
});
