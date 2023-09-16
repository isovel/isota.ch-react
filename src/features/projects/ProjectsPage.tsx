import styled from 'styled-components'
import { Colors } from 'themes'
import Accordian from './Accordian'
import Card from './Card'

export type Tag = {
  key: string
  displayName: string
  color: keyof typeof Colors
}

export type Project = {
  name: string
  link?: string
  source?: string
  description?: string
  tags?: Tag[]
  image?: string
}

export type ProjectCategory = {
  label: string
  items: Project[]
  itemPropertyDefaults: Partial<Project>
  itemPropertyOverrides: Partial<Project>
}

const { categories }: { categories: ProjectCategory[] } =
  (await (await fetch('/api/v1/projects')).json()) ?? []

const ProjectsPage = () => {
  return (
    <Container>
      <Content>
        <Title>Projects</Title>
        {categories.map((category, cIdx) => (
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
                  tags={project.tags}
                  style={{
                    animationDelay: `${pIdx * 50}ms`,
                  }}
                />
              )
            })}
          </Accordian>
        ))}
      </Content>
    </Container>
  )
}

const Title = styled.h1`
  font-size: 3em;
  font-weight: 600;
  margin-bottom: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 60%;

  @media only screen and (max-width: 1024px) {
    gap: 1em;
    width: 90%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20%;
  width: 100%;
  height: 100%;
  padding: 0 0 3em 0;
  overflow: hidden scroll;
`

export default ProjectsPage
