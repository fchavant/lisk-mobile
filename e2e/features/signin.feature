Feature: Sign In

  Scenario: Successful Sign In
    Given I open the app
    When type 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together' into element id 'signInPassphraseInput'
    And I tap element by id 'signInButton'
    Then the profile is visible
