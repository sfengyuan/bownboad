<template>
  <div id="app">
    <TabView @tab-change="onTabChange" :activeIndex.sync="activeTab">
      <TabPanel>
        <template #header>
          <i class="pi pi-home"></i>
          <span>主页</span>
        </template>
        <div class="p-inputgroup">
          <InputText
            v-model="home.inputUrl"
            @input="
              () => {
                home.inputUrlError = false
                loading = false
              }
            "
            placeholder="视频地址"
          />
          <InlineMessage v-if="home.inputUrlError">视频地址不对劲</InlineMessage>
          <Button
            icon="pi pi-plus"
            class="p-button-warning"
            @click="onInputUrl"
          />
        </div>
        <main>
          <List :videos="home.videos" dividerText="稿件中的视频">
            <template #controller="slotProps">
              <Fresh-Task-Controller
                v-if="home.videos.length"
                @changeAll="val => { slotProps.videos.forEach(v => v.selected = val) }" @switchAll="val => { slotProps.videos.forEach(v => v.isAudioOnly = val) }"
                @homeDownload="onHomeDownload"
                :videos="home.videos"
              >
              </Fresh-Task-Controller>
            </template>
            <template #default="slotProps">
              <Resolution-form :video="slotProps.video"></Resolution-form>
            </template>
          </List>
          <ProgressSpinner v-if="loading" />
        </main>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-download"></i>
          <span>下载中</span>
        </template>
        <List :videos="downloading.videos" dividerText="正在下载中">
          <template #controller>
            <Downloading-Task-Controller :videos="downloading.videos"></Downloading-Task-Controller>
          </template>
          <template #default="slotProps">
            <Downloading-Form :video="slotProps.video"></Downloading-Form>
          </template>
        </List>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-inbox"></i>
          <span>已完成</span>
        </template>
        <List :videos="downloaded.videos" dividerText="完成的任务">
          <template #controller>
            <Downloaded-Task-Controller :videos="downloaded.videos"></Downloaded-Task-Controller>
          </template>
          <template #default="slotProps">
            <Downloaded-Form :video="slotProps.video"></Downloaded-Form>
          </template>
        </List>
      </TabPanel>
      <TabPanel>
        <template #header>
          <i class="pi pi-cog"></i>
          <span>设置</span>
        </template>
        <span class="p-float-label">
          <InputText id="savedir" type="text" v-model="settings.dir" />
          <label for="savedir">保存目录</label>
        </span>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>

import List from './components/List.vue'
import ListItem from './components/List-Item.vue'
import ResolutionForm from './components/Resolution-Form.vue'
import FreshTaskController from './components/Fresh-Task-Controller.vue'
import DownloadingForm from './components/Downloading-Form.vue'
import DownloadingTaskController from './components/Downloading-Task-Controller.vue'
import DownloadedForm from './components/Downloaded-Form.vue'
import DownloadedTaskController from './components/Downloaded-Task-Controller.vue'

export default {
  data() {
    return {
      home: {
        videos: [],
        inputUrl: null,
        inputUrlError: null,
      },
      downloading: {
        videos: []
      },
      downloaded: {
        videos: []
      },
      settings: {
        dir: ''
      },
      activeTab: 0,
      loading: false
    }
  },
  methods: {
    onInputUrl() {
      this.home.inputUrl = this.home.inputUrl.trim()
      // if (this.home.inputUrl.length <= 0 | !/^https:\/\/www\.bilibili\.com\/video\/BV\w+/.test(this.home.inputUrl)) {
      //   this.home.inputUrlError = true
      //   return
      // }
      this.loading = true
      ipc.home.add(this.home.inputUrl, data => {
        this.loading = false

        if (data.error) {
          alert(data.message)
          return
        }
        this.home.videos = data
      })
    },
    onHomeDownload () {
      this.activeTab = 1
      ipc.home.download(this.home.videos, tasks => {
        console.log('home download reply', tasks)
        this.downloading.videos = tasks
        this.home.videos = []
      })
    },
    onTabChange({ index }) {
      // console.log("index ", index)
    },
  },
  computed: {},
  mounted() {
    ipc.global.taskStatusUpdate(tasks => {
      console.log('update downloading status', tasks)
      this.downloading.videos = tasks.filter(task => task.stat !== 2)
      this.downloaded.videos = tasks.filter(task => task.stat === 2)
    })
  },
  components: {
    List,
    ListItem,
    ResolutionForm,
    FreshTaskController,
    DownloadingTaskController,
    DownloadingForm,
    DownloadedTaskController,
    DownloadedForm
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style>
.no-break {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.p-tabview-nav .pi {
  padding-right: 0.5rem;
}

#app .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus,
#app .p-inputtext:enabled:focus {
  box-shadow: 0 0 0 0;
}

#app .p-inputtext {
  font-size: 0.8rem;
}
#app .p-dropdown {
  width: 125px;
}
#app .p-progress-spinner {
  position: fixed;
  height: 100px;
  display: inline-block;
  width: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
