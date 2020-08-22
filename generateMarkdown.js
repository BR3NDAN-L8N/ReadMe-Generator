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
  
  ## Finished Project
  
  <!-- Add deployed link when available -->
  [Deployed Project](http://www.example.com) 
  
  ## Project Demo
  
  ${data.demoMedia}

  ## Usage

  ${data.usage}

  ## License
  
  Begin license text.
        
        Copyright ${data.license.year} ${data.license.owner}
  ${data.license.licenseText}

  End license text.

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
  ${data.thanks}
  
  
`;
}

module.exports = generateMarkdown;
