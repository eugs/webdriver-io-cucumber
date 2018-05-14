Feature: Test 1

#  Scenario: First
#    Given I am on "Home" page
#    When I click on "Menu -> Feature" button
#    Then I should be on "Features" page
#    When I click on "Menu -> Feature" button

  @logout
   Scenario: Login
     Given I am on "Home" page
     When I click on "Menu -> Login" button
     Then I wait "2" second(s)
     Then I should be on "Login" page
    Then I wait element "Username" visibility for "5" seconds
     Then Element "Username" should be visible
     Then I enter text "$$User" in "Username" element
     Then I enter text "$$Password" in "Password" element
     When I click on "Login" button
     Then I should be on "Home" page

  @login
  Scenario: Logout
    Given I am on "Home" page
    When I click on "Menu -> User Button" button
    Then I click on "Menu -> User Dropdown -> Logout" button
    Then Element "Menu -> Login" should be visible

  Scenario Outline: : Search wdio package
    Given I am on "Home" page
    When I click on "Menu -> Search" button
    Then I enter text "wdio" in "Menu -> Search" element
    Then I wait "2" second(s)
    When I press "Enter" key
    Then I wait "2" second(s)
    Then I'm looking for "wdio" value of "Package -> Package Name" elements and click it
    Then I wait "2" second(s)
    When I click on "<Tab> Tab" button
    Then Element "Active <Tab> Tab" should be visible
    Then Element "<Tab> Info" should be visible
    Then I wait "1" second(s)
    Examples:
      |Tab           |
      |Readme        |
      |Dependencies  |
      |Dependents    |
      |Versions      |

    @luboitag
  Scenario: : Check sorted versions
    Given I am on "Home" page
    When I click on "Menu -> Search" button
    Then I enter text "wdio" in "Menu -> Search" element
    Then I wait "2" second(s)
    When I press "Enter" key
    Then I wait "5" second(s)
    Then I'm looking for "wdio" value of "Package -> Package Name" elements and click it
    Then I wait "3" second(s)
    When I click on "Versions Tab" button
    Then I wait "1" second(s)
    Then console log "Versions" element