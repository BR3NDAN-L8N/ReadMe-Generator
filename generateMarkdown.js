// function to generate markdown for README
function generateMarkdown(data) {
  return `
  <!-- PROJECT TITLE -->
  <br />
  <p align="center">
    <h1 align="center">${data.projectName}</h1>
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
  
  ## Finished Project <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>
  
  [Deployed Project](${data.deployedLink})
  
  ## Project Demo <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>
  
  ${data.demoMedia}

  ## Usage <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>

  ${data.usage}

  ## License <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>

  ${data.license}

  ## Contributions <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>

  ${data.contribution}

  ## Testing <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>
  
  ${data.testing}

  <!-- CONTACT -->
  # Contact <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>
  
  * [Email](${data.email})
  * [GitHub](${data.github})
  * [LinkedIn](${data.linkedIn})
  
  
  
  <!-- ACKNOWLEDGEMENTS -->
  # Acknowledgements <span style="font-size:16px; padding-left:20px">[^ Top ^](#table-of-contents)</span>
  ${data.thanks}
  
  
`;
}

module.exports = generateMarkdown;
