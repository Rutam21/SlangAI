document.addEventListener("DOMContentLoaded", () => {
  // Initiate and Run the App Tour Element
  if (localStorage.getItem("tour_complete") == null) {
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

// Event listener for tour completion
apptour.on("complete", () => {
  localStorage.setItem("tour_complete", "true");
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
  text: "In this section, deep dive into the origins, evolution and cultural imapct of a given Slang powered by our AI Models.",
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
