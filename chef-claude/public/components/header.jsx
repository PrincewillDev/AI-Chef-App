import ChefClaudeLogo from "/src/images/chef-claude-icon.png"

export default function Header(){
    return(
        <>
            <header>
                <img src={ChefClaudeLogo} alt="Chef Logo" />
                <h1>Chef Claude</h1>
            </header>
        </>
    )
}