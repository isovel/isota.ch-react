import styled from 'styled-components'
import Accordian from './Accordian'
import Card from './Card'

type Project = {
  name: string
  link?: string
  source?: string
  description?: string
  tags?: string[]
  image?: string
}

type ProjectCategory = {
  label: string
  items: Project[]
  itemPropertyDefaults: Partial<Project>
  itemPropertyOverrides: Partial<Project>
}

const projects: ProjectCategory[] = await (
  await fetch('/api/v1/projects')
).json()

const Projects = () => {
  return (
    <Container>
      <Title>Projects</Title>
      {projects.map((category, cIdx) => (
        <Accordian key={cIdx} title={category.label} open>
          {category.items.map((project, pIdx) => {
            return (
              <Card
                key={pIdx}
                title={project.name}
                description={project.description}
                href={project.link || project.source}
                image={
                  project.image
                    ? `https://isota.ch/${project.image}`
                    : 'favicon.png'
                }
                tags={project.tags ? project.tags : undefined}
                style={{
                  animationDelay: `${pIdx * 50}ms`,
                }}
              />
            )
          })}
        </Accordian>
      ))}
    </Container>
  )
}

const Title = styled.h1`
  font-size: 3em;
  font-weight: 600;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin: 0 20%;
  width: 60%;

  @media only screen and (max-width: 1024px) {
    gap: 1em;
    width: 90%;
  }
`

export default Projects
