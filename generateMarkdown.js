// function to generate markdown for README
function generateMarkdown(data) {
  return `
  <!-- PROJECT TITLE -->
  <br />
  <p align="center">
    <h1 align="center">${data.title}</h1>
  </p>
  
  
  
  <!-- TABLE OF CONTENTS -->
  # Table of Contents
  
  * [About the Project](#about-the-project)
      * [Live Link](#finished-project)
      * [Project Demo](#project-demo)
      * [Usage](#usage)
      * [License](#license)
      * [Contribution Instructions](#contributions)
      * [Test Instructions](#testing)
  * [Contact / Questions](#contact)
  * [Acknowledgements](#acknowledgements)
  
  
  
  <!-- ABOUT THE PROJECT -->
  # About The Project
  
  ## Finished Project
  
  [Deployed Project](${data.liveLink})
  
  ## Project Demo
  
  ${data.projectDemoLinkPath}

  ## Usage

  ${data.usage}

  ## License

  ${data.license}

  ## Contributions

  ${data.contribution}

  ## Testing
  
  ${data.testing}

  <!-- CONTACT -->
  # Contact
  
  * [Email](${data.email})
  * [GitHub](${data.github})
  * [LinkedIn](${data.linkedIn})
  
  
  
  <!-- ACKNOWLEDGEMENTS -->
  # Acknowledgements
  ${data.acknowledgements}
  
  
`;
}

module.exports = generateMarkdown;
